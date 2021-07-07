<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('items', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('brandId')->nullable();
            $table->foreignUuid('shopId');
            $table->foreignUuid('categoryId');
            $table->foreignUuid('userId');
            $table->string('name');
            $table->longText('description');
            $table->integer('costPrice');
            $table->integer('qtyInStock');
            $table->double('sellingPrice');
            $table->double('discountedPrice')->default(0)->nullable();
            $table->boolean('showIfCompleted')->default(false);
            $table->integer('reorderLevel')->default(0);
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
        Schema::dropIfExists('items');
    }
}
