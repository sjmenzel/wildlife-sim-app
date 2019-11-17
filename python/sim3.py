import json
import math
import random

CARNIVORE = 'carnivore'
HERBIVORE = 'herbivore'


class Simulation:
    def __init__(self, resources, decay=0.0):
        self.resources = resources
        self.populations = {}
        self.maturity = {}
        self.species = []
        self.total_population = 0
        self.decay = decay

    def include_species(self, new_species, initial_population):
        self.species.append(new_species)
        self.populations[new_species.name] = initial_population
        self.total_population += initial_population

    def remove_species(self, existing_species):
        if existing_species in self.species:
            self.total_population -= self.populations[existing_species.name]
            new_list = []
            for s in self.species:
                if s.name != existing_species.name:
                    new_list.append(s)
            self.species = new_list
            del self.populations[existing_species.name]

    def modify_population(self, existing_species, pop_change):
        if existing_species in self.species and existing_species.name in self.populations.keys():
            self.total_population = bound(self.total_population + pop_change, min=0)
            self.populations[existing_species.name] = bound(self.populations[existing_species.name] + pop_change, min=0)
            if self.populations[existing_species.name] <= 0:
                self.remove_species(existing_species)

    def get_total_population(self, species_list):
        total = 0
        for species in species_list:
            if species.name in self.populations.keys():
                total += self.populations[species.name]
            else:
                return 0
        return total

    def get_all_prey(self, species_list):
        all_prey = []
        for species in species_list:
            prey = species.prey(self)
            for p in prey:
                if p not in all_prey:
                    all_prey.append(p)
        return all_prey

    def get_total_resources(self, species):
        if species.diet == CARNIVORE:
            return self.get_total_population(species.prey(self))
        else:
            return self.resources

    # The avg weighted fitness of a list of competing species
    def get_avg_fitness(self, species_list):
        total_fitness, total_pop = 0, 0
        for species in species_list:
            pop = self.get_total_population([species])
            fitness = species.fitness
            total_fitness += pop * fitness
            total_pop += pop
        return total_fitness / total_pop if total_pop > 0 else 0


class Species:
    def __init__(self, name, diet, fitness, replication, energy_cost):
        self.name = name
        self.diet = diet
        self.fitness = fitness
        self.replication = replication
        self.energy_cost = energy_cost

    def prey(self, sim):
        prey = []
        if self.diet == CARNIVORE:
            for species in sim.species:
                if species.fitness <= self.fitness and species.name != self.name:
                    prey.append(species)
        return prey

    # Returns a list of species who hunt this species
    def predators(self, sim):
        predators = []
        for species in sim.species:
            if species.fitness >= self.fitness and species.diet == CARNIVORE and species.name != self.name:
                predators.append(species)
        return predators

    # Returns a list of species who compete for the same resources
    def competition(self, simulation):
        competition = []
        for species in simulation.species:
            if species.diet == self.diet:
                competition.append(species)
        return competition

    # Returns the percentage of prey in relation to other predators population
    def p_rel_prey(self, sim, prey):
        if self.diet == HERBIVORE:
            return 0
        num_prey = sim.get_total_population([prey])
        predators_of_prey = prey.predators(sim)
        num_predators = sim.get_total_population(predators_of_prey)
        species_pop = sim.get_total_population([self])
        return ((species_pop / num_predators) * num_prey) / num_prey if num_predators > 0 and num_prey > 0 else 0

    # Returns the percentage of prey after competition in relation to population
    def p_net_prey(self, sim, prey):
        if self.diet == HERBIVORE:
            return 0
        p_rel_prey = self.p_rel_prey(sim, prey)
        predators_of_prey = prey.predators(sim)
        avg_fitness = sim.get_avg_fitness(predators_of_prey)
        fitness = self.fitness
        return p_rel_prey * (fitness / avg_fitness) if avg_fitness > 0 else 0

    # Returns number of a single prey after competition
    def net_prey_resources(self, sim, prey):
        return self.p_net_prey(sim, prey) * sim.get_total_population([prey])

    # Returns the number of all prey available after competition for a species
    def total_net_prey_resources(self, sim):
        # Get all prey
        prey = self.prey(sim)
        # Get the number of net prey per prey and add to total
        total_num_prey = 0
        for p in prey:
            total_num_prey += self.net_prey_resources(sim, p)
        return total_num_prey

    # Returns the number of a single prey consumed by a species
    def num_prey_consumption(self, sim, prey):
        if prey in self.prey(sim):
            total_prey_needed = sim.get_total_population([self]) * self.energy_cost
            total_prey_wanted = total_prey_needed * 1.5
            total_prey_available = self.total_net_prey_resources(sim)
            chance = bound(total_prey_wanted / total_prey_available, max=1) if total_prey_available > 0 else 0
            this_prey_pop = sim.get_total_population([prey])
            a = round((this_prey_pop * chance) / prey.energy_cost)
            return bound(a, min=0, max=total_prey_wanted)
        return 0

    # Returns the number of energy gained from consuming a single prey species
    def num_energy_gained(self, sim, prey):
        if prey in self.prey(sim):
            return self.num_prey_consumption(sim, prey) * prey.energy_cost
        return 0

    # Returns the number of a all energy gained by consuming prey
    def total_energy_gained(self, sim):
        prey = self.prey(sim)
        total = 0
        for p in prey:
            total += self.num_energy_gained(sim, p)
        return total

    # Returns the number of a all prey consumed by a species
    def total_prey_consumption(self, sim):
        prey = self.prey(sim)
        total = 0
        for p in prey:
            total += self.num_prey_consumption(sim, p)
        return total

    # Returns the number of a single prey consumed out of its total population by this species
    def p_prey_consumed(self, sim, prey):
        num_prey_consumed = self.num_prey_consumption(sim, prey)
        total_pop = sim.get_total_population([prey])
        return num_prey_consumed / total_pop if total_pop > 0 else 0

    # Percent of resources in relation to population size
    def p_rel_resources(self, sim):
        t_resources, t_pop = sim.get_total_resources(self), sim.get_total_population([self])
        return (t_resources * (t_resources / t_pop)) / 100 if t_pop > 0 else 0

    # Percent of resources after competition and relation to population size
    def p_net_resources(self, sim):
        rr, fit, avg_fit = self.p_rel_resources(sim), self.fitness, sim.get_avg_fitness(self.competition(sim))
        return rr * (fit / avg_fit) if avg_fit > 0 else 1

    # Number of net resources
    def net_resources(self, sim):
        return self.p_net_resources(sim) * sim.get_total_resources(self)

    # Percent of a species that will die from being hunted
    def p_predation(self, sim):
        predators = self.predators(sim)
        total_predation = 0
        for predator in predators:
            total_predation += predator.p_prey_consumed(sim, self)
        return bound(total_predation, min=0, max=1)

    def p_replication(self, sim):
        if self.diet == CARNIVORE:
            rep, consumed, needed = self.replication, self.total_energy_gained(sim), sim.get_total_population([self]) * self.energy_cost
        else:
            rep, consumed, needed = self.replication, self.net_resources(sim), sim.get_total_population([self]) * self.energy_cost
        return rep * bound(consumed / needed, min=0, max=1) if needed > 0 else 0

    # Percent of a species that will starve
    def p_starvation(self, sim):
        if self.diet == HERBIVORE:
            net_r, t_pop, cost = self.net_resources(sim), sim.get_total_population([self]), self.energy_cost
        else:
            net_r, t_pop, cost = self.total_prey_consumption(sim), sim.get_total_population([self]), self.energy_cost
        return bound(1 - (net_r / (t_pop * cost)), min=0, max=1) if t_pop > 0 else 0

    # Percent of a species that will die from various reasons
    def p_death(self, sim):
        starvation, illness, predation = self.p_starvation(sim), 0, self.p_predation(sim)
        return bound(starvation + illness + predation, min=0, max=1)

    # The change in population
    def pop_change(self, sim):
        starvation = self.p_starvation(sim)
        replication, death, population = self.p_replication(sim), self.p_death(sim), sim.get_total_population([self])
        change = (replication * (1-starvation) - death) * population
        return math.floor(change) if change <=0 else math.ceil(change)


def bound(value, min=None, max=None):
    if min is not None and value < min:
        return min
    if max is not None and value > max:
        return max
    return value


def random_species(n):
    species = []
    for i in range(n):
        diet = random.choice([HERBIVORE, CARNIVORE])
        sp = Species("", diet, random.random(), random.random(), random.randint(0, 100) / 10)
        sp.name = sp.diet + '_' + str(sp.fitness) + '_' + str(sp.energy_cost) + '_' + str(sp.replication)
        species.append(sp)

    return species


sim1 = Simulation(15000)

alls = random_species(10)

popData = []

for s in alls:
    sim1.include_species(s, random.randint(10, 10000))
    popData.append({'pop': [], 'name': ""})

for i in range(50):
    for i in range(len(alls)):
        species = alls[i]
        popData[i]['pop'].append(sim1.get_total_population([species]))
        popData[i]['name'] = species.name

    pops = {}

    for s in alls:
        pops[s.name] = s.pop_change(sim1)

    for s in alls:
        sim1.modify_population(s, pops[s.name])

with open('data.json', 'w') as f:
    json.dump(popData, f)




