module Api
    module V1
        class TrainersController < ApplicationController

            @@options = { include: [:teams] }

            protect_from_forgery with: :null_session

            def index
                trainers = Trainer.all
                
                render json: serializer(trainers, @@options)
            end

            def show
                trainer = lowercase_findby

                render json: serializer(trainer, @@options)
            end

            def create
                trainer = Trainer.new(trainer_params)

                if trainer.save
                    render json: serializer(trainer, @@options)
                else 
                    render json: { error: trainer.errors.messages }
                end
            end

            def update
                trainer = lowercase_findby

                if trainer.update(trainer_params) # [] DÁ ERRO SE NÃO EXISTIR O NOME
                    render json: serializer(trainer, @@options)
                else 
                    render json: { error: trainer.errors.messages }
                end
            end

            def destroy
                trainer = Trainer.find_by(params[:id])

                if trainer.destroy
                    head :no_content
                else 
                    render json: { error: trainer.errors.messages }
                end
            end


            private 
            
            def lowercase_findby
                return Trainer.where('lower(name) = ?', params[:name].downcase).first 
            end

            def trainer_params
                params.require(:trainer).permit(:name, :age, :gender, :image)
            end

            def serializer(records, options = {})
                TrainerSerializer.new(records, options).serialized_json
            end
        end
    end
end