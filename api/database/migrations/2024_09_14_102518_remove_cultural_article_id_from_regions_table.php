<?php
// database/migrations/xxxx_xx_xx_remove_cultural_article_id_from_regions_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class RemoveCulturalArticleIdFromRegionsTable extends Migration
{
    public function up()
    {
        Schema::table('regions', function (Blueprint $table) {
            // Drop foreign key constraint
            $table->dropForeign(['cultural_article_id']);
            
            // Drop the column
            $table->dropColumn('cultural_article_id');
        });
    }

    public function down()
    {
        Schema::table('regions', function (Blueprint $table) {
            // Re-add the column
            $table->foreignId('cultural_article_id')->nullable()->constrained('cultural_articles')->onDelete('set null');
        });
    }
}
