<?php

namespace Database\Seeders;

use App\Models\Accommodation;
use App\Models\LocalTransport;
use App\Models\CulturalArticle;
use Illuminate\Database\Seeder;
use App\Models\TravelInformation;
use App\Models\CulturalArticleCategory;

class ArticleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $articles = [
            [
                'title' => 'Whirling Dervishes',
                'description' => 'The Whirling Dervishes are a form of Sufi dance...',
                'history' => 'The history of the Whirling Dervishes dates back to the 13th century...',
                'traditions' => 'The Sema ceremony is the main tradition of the Whirling Dervishes...',
                'language' => 'Turkish',
                'practices' => 'The ceremony involves spinning and chanting...',
                'media' => [
                    'https://example.com/whirling-dervishes1.jpg',
                    'https://example.com/whirling-dervishes2.jpg',
                    'https://example.com/whirling-dervishes3.jpg',
                ],
                'region_id' => 1,
            ],
            [
                'title' => 'Turkish Coffee',
                'description' => 'Turkish Coffee is a popular and traditional way of making coffee...',
                'history' => 'Turkish Coffee has been a part of Turkish culture for centuries...',
                'traditions' => 'The preparation and serving of Turkish Coffee are considered a form of art...',
                'language' => 'Turkish',
                'practices' => 'Turkish Coffee is served with water and sometimes with sweets...',
                'media' => [
                    'https://example.com/turkish-coffee1.jpg',
                    'https://example.com/turkish-coffee2.jpg',
                    'https://example.com/turkish-coffee3.jpg',
                ],
                'region_id' => 2,
            ],
            [
                'title' => 'Blue Mosque',
                'description' => 'The Blue Mosque, also known as Sultan Ahmed Mosque, is a famous mosque...',
                'history' => 'Built in the early 17th century, the Blue Mosque is an iconic landmark in Istanbul...',
                'traditions' => 'The mosque is still used for prayers, and it attracts tourists from around the world...',
                'language' => 'Turkish',
                'practices' => 'Visitors to the mosque must follow proper etiquette and dress modestly...',
                'media' => [
                    'https://example.com/blue-mosque1.jpg',
                    'https://example.com/blue-mosque2.jpg',
                    'https://example.com/blue-mosque3.jpg',
                ],
                'region_id' => 3,
            ],
            [
                'title' => 'Grand Bazaar',
                'description' => 'The Grand Bazaar is one of the oldest and largest covered markets in the world...',
                'history' => 'The Grand Bazaar has been a center of trade and commerce for centuries...',
                'traditions' => 'The market is divided into sections, each specializing in different goods...',
                'language' => 'Turkish',
                'practices' => 'Visitors can haggle and negotiate prices with the shopkeepers...',
                'media' => [
                    'https://example.com/grand-bazaar1.jpg',
                    'https://example.com/grand-bazaar2.jpg',
                    'https://example.com/grand-bazaar3.jpg',
                ],
                'region_id' => 4,
            ],
            [
                'title' => 'Cappadocia',
                'description' => 'Cappadocia is a region in central Turkey known for its unique landscape...',
                'history' => 'The region has a rich history dating back to ancient times...',
                'traditions' => 'Cappadocia is famous for its cave dwellings and rock formations...',
                'language' => 'Turkish',
                'practices' => 'Visitors can take hot air balloon rides to see the landscape from above...',
                'media' => [
                    'https://example.com/cappadocia1.jpg',
                    'https://example.com/cappadocia2.jpg',
                    'https://example.com/cappadocia3.jpg',
                ],
                'region_id' => 5,
            ],
            [
                'title' => 'Turkish Bath',
                'description' => 'The Turkish Bath, also known as Hammam, is a traditional bathing ritual...',
                'history' => 'The Turkish Bath has been a part of Turkish culture for centuries...',
                'traditions' => 'The bath involves a series of steps, including steam, scrubbing, and massage...',
                'language' => 'Turkish',
                'practices' => 'Visitors can experience the Turkish Bath in many cities across Turkey...',
                'media' => [
                    'https://example.com/turkish-bath1.jpg',
                    'https://example.com/turkish-bath2.jpg',
                    'https://example.com/turkish-bath3.jpg',
                ],
                'region_id' => 1,
            ],
            [
                'title' => 'Turkish Delight',
                'description' => 'Turkish Delight, also known as Lokum, is a popular sweet treat...',
                'history' => 'Turkish Delight has a long history and is associated with Turkish culture...',
                'traditions' => 'The sweet confection comes in various flavors and is often served with tea...',
                'language' => 'Turkish',
                'practices' => 'Visitors can buy Turkish Delight from shops and markets across Turkey...',
                'media' => [
                    'https://example.com/turkish-delight1.jpg',
                    'https://example.com/turkish-delight2.jpg',
                    'https://example.com/turkish-delight3.jpg',
                ],
                'region_id' => 2,
            ],
            [
                'title' => 'Anatolian Carpets',
                'description' => 'Anatolian Carpets, also known as Turkish rugs, are handwoven textiles...',
                'history' => 'The art of carpet weaving in Turkey dates back thousands of years...',
                'traditions' => 'Anatolian Carpets are known for their intricate designs and quality...',
                'language' => 'Turkish',
                'practices' => 'Visitors can purchase authentic carpets from local artisans and shops...',
                'media' => [
                    'https://example.com/anatolian-carpets1.jpg',
                    'https://example.com/anatolian-carpets2.jpg',
                    'https://example.com/anatolian-carpets3.jpg',
                ],
                'region_id' => 3,
            ],
            [
                'title' => 'Turkish Music',
                'description' => 'Turkish Music is a rich and diverse musical tradition...',
                'history' => 'Turkish Music has roots in various cultures and historical periods...',
                'traditions' => 'The music includes genres like classical, folk, and contemporary...',
                'language' => 'Turkish',
                'practices' => 'Visitors can enjoy live music performances in concert halls and cafes...',
                'media' => [
                    'https://example.com/turkish-music1.jpg',
                    'https://example.com/turkish-music2.jpg',
                    'https://example.com/turkish-music3.jpg',
                ],
                'region_id' => 4,
            ],
            [
                'title' => 'Turkish Ceramics',
                'description' => 'Turkish Ceramics are decorative and functional pottery items...',
                'history' => 'The art of Turkish ceramics has a long history dating back to ancient times...',
                'traditions' => 'Turkish Ceramics are known for their intricate designs and vibrant colors...',
                'language' => 'Turkish',
                'practices' => 'Visitors can buy ceramics from local artisans and pottery workshops...',
                'media' => [
                    'https://example.com/turkish-ceramics1.jpg',
                    'https://example.com/turkish-ceramics2.jpg',
                    'https://example.com/turkish-ceramics3.jpg',
                ],
                'region_id' => 5,
            ],
            [
                'title' => 'Turkish Cuisine',
                'description' => 'Turkish Cuisine is a fusion of Middle Eastern, Mediterranean, and Balkan flavors...',
                'history' => 'Turkish Cuisine has a rich culinary heritage with influences from various cultures...',
                'traditions' => 'Turkish meals often include mezes, kebabs, and desserts like baklava...',
                'language' => 'Turkish',
                'practices' => 'Visitors can enjoy traditional Turkish dishes at local restaurants and eateries...',
                'media' => [
                    'https://example.com/turkish-cuisine1.jpg',
                    'https://example.com/turkish-cuisine2.jpg',
                    'https://example.com/turkish-cuisine3.jpg',
                ],
                'region_id' => 1,
            ],
            [
                'title' => 'Turkish Tea',
                'description' => 'Turkish Tea, also known as çay, is a popular hot beverage in Turkey...',
                'history' => 'Turkish Tea has been a staple in Turkish culture for centuries...',
                'traditions' => 'The tea is brewed in a special double teapot and served in small glasses...',
                'language' => 'Turkish',
                'practices' => 'Visitors can enjoy Turkish Tea at tea gardens, cafes, and homes...',
                'media' => [
                    'https://example.com/turkish-tea1.jpg',
                    'https://example.com/turkish-tea2.jpg',
                    'https://example.com/turkish-tea3.jpg',
                ],
                'region_id' => 2,
            ],
            [
                'title' => 'Turkish Baths',
                'description' => 'Turkish Baths, also known as Hammams, are traditional bathhouses...',
                'history' => 'Turkish Baths have been an integral part of Turkish culture for centuries...',
                'traditions' => 'The baths offer a cleansing and relaxing experience for visitors...',
                'language' => 'Turkish',
                'practices' => 'Visitors can enjoy a traditional bath and massage at local Hammams...',
                'media' => [
                    'https://example.com/turkish-baths1.jpg',
                    'https://example.com/turkish-baths2.jpg',
                    'https://example.com/turkish-baths3.jpg',
                ],
                'region_id' => 3,
            ],
            [
                'title' => 'Turkish Spices',
                'description' => 'Turkish Spices are an essential part of Turkish cuisine and culture...',
                'history' => 'The spice trade has been a significant aspect of Turkish history...',
                'traditions' => 'Turkish spices are used in cooking, baking, and traditional remedies...',
                'language' => 'Turkish',
                'practices' => 'Visitors can buy a variety of spices from local markets and shops...',
                'media' => [
                    'https://example.com/turkish-spices1.jpg',
                    'https://example.com/turkish-spices2.jpg',
                    'https://example.com/turkish-spices3.jpg',
                ],
                'region_id' => 4,
            ],
            [
                'title' => 'Turkish Sweets',
                'description' => 'Turkish Sweets, also known as Tatlı, are a delightful part of Turkish cuisine...',
                'history' => 'Turkish sweets have a long history and are enjoyed on special occasions...',
                'traditions' => 'The sweets include baklava, Turkish delight, and künefe...',
                'language' => 'Turkish',
                'practices' => 'Visitors can indulge in a variety of Turkish sweets at local dessert shops...',
                'media' => [
                    'https://example.com/turkish-sweets1.jpg',
                    'https://example.com/turkish-sweets2.jpg',
                    'https://example.com/turkish-sweets3.jpg',
                ],
                'region_id' => 5,
            ]
        ];

        foreach ($articles as $articleData) {
            // Create a cultural article
            $culturalArticle = CulturalArticle::create([
                'title' => $articleData['title'],
                'description' => $articleData['description'],
                'history' => $articleData['history'],
                'traditions' => $articleData['traditions'],
                'language' => $articleData['language'],
                'practices' => $articleData['practices'],
                'media' => json_encode($articleData['media']), // Store media as a JSON array
                'region_id' => $articleData['region_id'],
            ]);

            // Create travel information
            $travelInformation = TravelInformation::create([
                'cultural_article_id' => $culturalArticle->id,
                'travel_tips' => "Travel tips for visiting {$articleData['title']} in Turkey...",
            ]);

            // Create accommodations
            $accommodations = [
                [
                    'hotel_name' => 'Hotel C',
                    'link_to_booking_site' => 'https://booking.com/hotel-c',
                ],
                [
                    'hotel_name' => 'Hotel D',
                    'link_to_booking_site' => 'https://booking.com/hotel-d',
                ],
            ];

            foreach ($accommodations as $accommodationData) {
                Accommodation::create([
                    'travel_information_id' => $travelInformation->id,
                    'hotel_name' => $accommodationData['hotel_name'],
                    'link_to_booking_site' => $accommodationData['link_to_booking_site'],
                ]);
            }

            // Create local transports
            $localTransports = [
                [
                    'transport_type' => 'Tram',
                    'details' => 'Local tram transport details in Turkey...',
                ],
                [
                    'transport_type' => 'Ferry',
                    'details' => 'Local ferry transport details...',
                ],
            ];

            foreach ($localTransports as $transportData) {
                LocalTransport::create([
                    'travel_information_id' => $travelInformation->id,
                    'transport_type' => $transportData['transport_type'],
                    'details' => $transportData['details'],
                ]);
            }

            // Create cultural article categories
            $categories = [1, 3]; // Assuming category IDs 1 and 3 exist

            foreach ($categories as $categoryId) {
                CulturalArticleCategory::create([
                    'cultural_article_id' => $culturalArticle->id,
                    'category_id' => $categoryId,
                ]);
            }
        }
    }
}