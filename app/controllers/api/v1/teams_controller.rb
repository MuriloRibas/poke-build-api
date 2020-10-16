module Api
    module V1
        class TeamsController < ApplicationController
            @@options = { include: [:trainer] }
            
            protect_from_forgery with: :null_session

            def index 
                team = Team.all

                render json: serializer(team, @@options)
            end

            # def show 
            #     team = Team.find_by(id: params[:id])

            #     render json: serializer(team)
            # end

            def create
                team = Team.new(team_params)

                if team.save
                    render json: serializer(team)
                else
                    render json: { error: team.errors.messages }
                end
            end

            def update # [] UPDATE APENAS DE DETERMINADAS COISAS, E NÃO TODOS 
                team = Team.find_by(id: params[:id])

                if team.update(team_params)
                    render json: serializer(team, @@options)
                else 
                    render json: { error: team.errors.messages }
                end
            end

            def destroy
                team = Team.find_by(id: params[:id])

                if team.destroy
                    head :no_content
                else 
                    render json: { error: team.errors.messages }
                end
            end

            private

            def team_params
                params.require(:team).permit(:trainer_id, pokemons: [:name, :type, :front_sprite]) # [] DEFINIR O QUE PODE IR DENTRO DE POKEONS

            end

            def serializer(records, options = {})
                TeamSerializer.new(records, options).serialized_json
            end
        end
    end
end