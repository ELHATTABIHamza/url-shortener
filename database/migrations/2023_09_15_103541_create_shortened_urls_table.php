<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
   

    public function up()
    {
        Schema::create('shortened_urls', function (Blueprint $table) {
            $table->id();
            $table->string('short_url')->unique();
            $table->text('original_url');
            $table->unsignedBigInteger('click_count')->default(0);
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('shortened_urls');
    }
};
