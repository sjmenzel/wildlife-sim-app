import enum
import math


def bound(value, min=None, max=None):
    if min is not None and value < min:
        return min
    if max is not None and value > max:
        return max
    return value


class Simulation:
    def __init__(self, resources, decay=0.0):
        self.resources = resources
        self.populations = {}
        self.species = []
        self.total_population = 0
        self.decay = decay

    def apply_decay(self):
        self.resources -= (self.resources * self.decay)

    def include_species(self, new_species, initial_population):
        # self.species[new_species.name] = new_species
        self.species.append(new_species)
        self.populations[new_species.name] = initial_population
        self.total_population += initial_population

    def remove_species(self, existing_species):
        if existing_species in self.species:
            self.total_population -= self.populations[existing_species.name]
            del self.species[existing_species.name]
            del self.populations[existing_species.name]

    def modify_population(self, existing_species, pop_change):
        if existing_species in self.species:
            self.total_population = bound(self.total_population + pop_change, min=0)
            self.populations[existing_species.name] = bound(self.populations[existing_species.name] + pop_change, min=0)

    def get_total_population(self, species_list):
        total = 0
        for species in species_list:
            total += self.populations[species.name]
        return total

    def get_all_prey(self, species_list):
        all_prey = []
        for species in species_list:
            prey = species.prey(self)
            for p in prey:
                if p not in all_prey:
                    all_prey.append(p)
        return all_prey

    def get_avg_cost(self, species_list):
        total_cost, total_pop = 0, 0
        for species in species_list:
            pop = self.get_total_population([species])
            cost = species.energy_cost
            total_cost += pop * cost
            total_pop += pop
        try:
            a = total_cost / total_pop
        except ZeroDivisionError:
            a = 0
        return a

    def get_avg_fitness(self, species_list):
        total_fitness, total_pop = 0, 0
        for species in species_list:
            pop = self.get_total_population([species])
            fitness = species.fitness
            total_fitness += pop * fitness
            total_pop += pop
        try:
            a = total_fitness / total_pop
        except ZeroDivisionError:
            a = 0
        return 0

    def print_populations(self, time=None):
        if time:
            print("TIME =", str(time))
        for species in self.populations.keys():
            print(species + ":", self.populations[species])
        print()


class Species:
    class Diet(enum.Enum):
        carnivore = "carnivore"
        herbivore = "herbivore"

    def __init__(self, name, diet, fitness, replication, energy_cost):
        self.name = name
        self.diet = diet
        self.fitness = fitness
        self.replication = replication
        self.energy_cost = energy_cost

    def predators(self, simulation):
        predators = []
        for species in simulation.species:
            if species.diet == 'carnivore' and species.fitness >= self.fitness:
                predators.append(species)
        return predators

    def prey(self, simulation):
        prey = []
        if self.diet == 'carnivore':
            for species in simulation.species:
                if species.fitness <= self.fitness and species.name != self.name:
                    prey.append(species)
        return prey

    def competition(self, simulation):
        competition = []
        for species in simulation.species:
            if species.diet == self.diet:
                competition.append(species)
        return competition

    def resource_count(self, simulation):
        if self.diet == 'carnivore':
            prey = self.prey(simulation)
            return simulation.get_total_population(prey)
        else:
            return simulation.resources

    def resource_ratio(self, simulation):
        resources = self.resource_count(simulation)
        competitors = self.competition(simulation)
        avg_cost = simulation.get_avg_cost(competitors)
        total_pop = simulation.get_total_population(competitors)
        try:
            a = bound(resources / (total_pop * avg_cost), min=0)
        except ZeroDivisionError:
            a = 0
        return a

    def relative_fitness(self, simulation):
        competitors = self.competition(simulation)
        avg_fitness = simulation.get_avg_fitness(competitors)
        return (self.fitness - avg_fitness) / 100

    def predation_ratio(self, simulation):
        predators = self.predators(simulation)
        prey_pop = simulation.get_total_population(simulation.get_all_prey(predators))
        predator_pop = simulation.get_total_population(predators)
        species_pop = simulation.get_total_population([self])
        avg_cost = simulation.get_avg_cost(predators)
        try:
            a = bound((predator_pop * avg_cost / prey_pop) * (species_pop / prey_pop), min=0)
        except ZeroDivisionError:
            a = 0
        return a

    def prey_ratio(self, simulation):
        prey = self.prey(simulation)
        prey_pop = simulation.get_total_population(prey)
        competitors = self.competition(simulation)
        competitor_pop = simulation.get_total_population(competitors)
        return bound(competitor_pop / prey_pop, min=0)

    def starvation_chance(self, simulation):
        return bound(1 - self.resource_ratio(simulation) - self.relative_fitness(simulation), min=0, max=1)

    def death_chance(self, simulation):
        return bound(self.predation_ratio(simulation) + self.starvation_chance(simulation), min=0, max=0.99)

    def expected_pop_change(self, simulation):
        pop = (self.replication - self.death_chance(simulation)) * simulation.get_total_population([self])
        if pop <= 0:
            return math.floor(pop)
        else:
            return math.ceil(pop)


sim1 = Simulation(10000, 0.001)

hb1 = Species('SpeciesA', 'herbivore', 40, 0.3, 1)
hb2 = Species('SpeciesB', 'herbivore', 30, 0.4, 1)

cv1 = Species('SpeciesC', 'carnivore', 35, 0.3, 1)
cv2 = Species('SpeciesD', 'carnivore', 45, 0.2, 2)

sim1.include_species(hb1, 100)
sim1.include_species(hb2, 300)
sim1.include_species(cv1, 25)
sim1.include_species(cv2, 10)

sim1.print_populations(0)

for i in range(2000):
    p1 = hb1.expected_pop_change(sim1)
    p2 = hb2.expected_pop_change(sim1)
    p3 = cv1.expected_pop_change(sim1)
    p4 = cv2.expected_pop_change(sim1)
    sim1.modify_population(hb1, p1)
    sim1.modify_population(hb2, p2)
    sim1.modify_population(cv1, p3)
    sim1.modify_population(cv2, p4)
    sim1.print_populations(i)
    print("Resources:", sim1.resources)
    sim1.apply_decay()

print("PR", hb2.predation_ratio(sim1))
print("PREY", cv1.resource_count(sim1))
