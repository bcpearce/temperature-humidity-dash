class CreateDays < ActiveRecord::Migration
  def change
    create_table :days do |t|
      t.decimal :avg_temperature
      t.decimal :avg_humidity
      t.date :date

      t.timestamps null: false
    end
  end
end
