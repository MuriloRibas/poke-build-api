class CreateTeams < ActiveRecord::Migration[6.0]
  def change

    create_table :teams do |t|
      t.jsonb :pokemons

      t.belongs_to :trainer, null: false, foreign_key: true
      t.timestamps

    end
    
  end
end
