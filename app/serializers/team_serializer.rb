class TeamSerializer
  include FastJsonapi::ObjectSerializer
  attributes :pokemons, :trainer_id

  belongs_to :trainer, serializer: TrainerSerializer
end
