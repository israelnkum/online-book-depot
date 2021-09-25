<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePickupStationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('pickup_stations', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('name');
            $table->string('nearestLandMark')->nullable();
            $table->double('shippingFee')->default(0);
            $table->text('address');
            $table->string('contactPerson');
            $table->string('phoneNumber', 20);
            $table->string('phoneNumberAlt', 20)->nullable();
            $table->string('region', 20);
            $table->text('additionalInfo')->nullable();
            $table->softDeletes();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('pickup_stations');
    }
}
