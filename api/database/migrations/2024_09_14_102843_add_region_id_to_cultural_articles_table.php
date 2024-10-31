<?php

// database/migrations/xxxx_xx_xx_add_region_id_to_cultural_articles_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddRegionIdToCulturalArticlesTable extends Migration
{
    public function up()
    {
        Schema::table('cultural_articles', function (Blueprint $table) {
            // Add the region_id column
            $table->foreignId('region_id')->nullable()->constrained('regions')->onDelete('set null');
        });
    }

    public function down()
    {
        Schema::table('cultural_articles', function (Blueprint $table) {
            // Drop the foreign key constraint and column
            $table->dropForeign(['region_id']);
            $table->dropColumn('region_id');
        });
    }
}
