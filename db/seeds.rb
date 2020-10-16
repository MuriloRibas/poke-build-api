# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

trainers = Trainer.create([
    {
        name: "Murilo",
        gender: "Male",
        image: "none",
        age: 21
    },
    {
        name: "Lucas",
        gender: "Male",
        image: "none",
        age: 18
    }
])

teams = Team.create(
    trainer: trainers.first,
    pokemons: [
        {
            name: "Pikachu",
            type: "Electre",
            front_sprite: "none"
        },
        {
            name: "Chalizard",
            type: "Fire",
            front_sprite: "none"
        }
    ]
)