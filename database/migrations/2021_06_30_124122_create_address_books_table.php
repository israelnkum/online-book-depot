<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateAddressBooksTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('address_books', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('userId');
            $table->string('otherNames');
            $table->string('surName');
            $table->string('phoneNumber');
            $table->string('phoneNumberAlt')->nullable();
            $table->text('address');
            $table->text('additionalInfo');
            $table->string('region');
            $table->string('city');
            $table->boolean('default')->default(false);
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
        Schema::dropIfExists('address_books');
    }
}
