class ChangePokemonColumnToText < ActiveRecord::Migration[6.0]
  def change
    change_column :teams, :pokemons, :text, default: [].yaml
  end
end
