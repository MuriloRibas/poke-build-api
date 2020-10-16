class Team < ApplicationRecord
    belongs_to :trainer

    serialize :pokemons, Array
end
