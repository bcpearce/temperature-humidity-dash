class AddSensorIdToReading < ActiveRecord::Migration
  def change
    add_column :readings, :sensor_id, :integer
  end
end
