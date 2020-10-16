class TrainerSerializer
  include FastJsonapi::ObjectSerializer
  attributes :name, :age, :gender, :image

  has_many :teams
end
