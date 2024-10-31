<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;

class EventSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // $events = [
        //     // January
        //     [
        //         'name' => 'Gena',
        //         'description' => 'Gena is the Ethiopian Orthodox celebration of Christmas.',
        //         'media' => 'gena.jpg',
        //         'location' => 'Lalibela',
        //         'date' => '2024-01-07',
        //     ],
        //     [
        //         'name' => 'Timkat',
        //         'description' => 'Timkat is the Ethiopian Orthodox celebration of Epiphany.',
        //         'media' => 'timkat.jpg',
        //         'location' => 'Gondar',
        //         'date' => '2024-01-19',
        //     ],
        //     [
        //         'name' => 'Saint George’s Day',
        //         'description' => 'A religious holiday dedicated to Saint George, one of Ethiopia’s patron saints.',
        //         'media' => 'saint_george.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-01-28',
        //     ],
        //     [
        //         'name' => 'Yeferes Gugs',
        //         'description' => 'A traditional horse racing event celebrating cultural pride.',
        //         'media' => 'yeferes_gugs.jpg',
        //         'location' => 'Gondar',
        //         'date' => '2024-01-30',
        //     ],

        //     // February
        //     [
        //         'name' => 'Adwa Victory Day',
        //         'description' => 'Commemoration of the Ethiopian victory over Italy at the Battle of Adwa.',
        //         'media' => 'adwa_victory.jpg',
        //         'location' => 'Adwa',
        //         'date' => '2024-02-23',
        //     ],
        //     [
        //         'name' => 'Tsedey',
        //         'description' => 'Tsedey is the Ethiopian celebration of the harvest.',
        //         'media' => 'tsedey.jpg',
        //         'location' => 'Amhara Region',
        //         'date' => '2024-02-15',
        //     ],
        //     [
        //         'name' => 'Hidar Tsion',
        //         'description' => 'Hidar Tsion is a major religious event celebrated in Axum, dedicated to the Ark of the Covenant.',
        //         'media' => 'hidar_tsion.jpg',
        //         'location' => 'Axum',
        //         'date' => '2024-02-10',
        //     ],

        //     // March
        //     [
        //         'name' => 'Buhe',
        //         'description' => 'Buhe is a children’s holiday where they go door to door singing songs.',
        //         'media' => 'buhe.jpg',
        //         'location' => 'Amhara Region',
        //         'date' => '2024-03-09',
        //     ],
        //     [
        //         'name' => 'Fasika (Ethiopian Easter)',
        //         'description' => 'Fasika is the Ethiopian Orthodox celebration of Easter.',
        //         'media' => 'fasika.jpg',
        //         'location' => 'Lalibela',
        //         'date' => '2024-03-16',
        //     ],
        //     [
        //         'name' => 'Sheikh Hussein Pilgrimage',
        //         'description' => 'A major Islamic pilgrimage to the shrine of Sheikh Hussein.',
        //         'media' => 'sheikh_hussein.jpg',
        //         'location' => 'Bale',
        //         'date' => '2024-03-22',
        //     ],
        //     [
        //         'name' => 'Sebat Bet Gurage New Year',
        //         'description' => 'New Year’s celebration by the Sebat Bet Gurage people.',
        //         'media' => 'gurage_new_year.jpg',
        //         'location' => 'Southern Nations, Nationalities, and Peoples’ Region',
        //         'date' => '2024-03-30',
        //     ],

        //     // April
        //     [
        //         'name' => 'Siklet',
        //         'description' => 'Commemoration of the crucifixion of Jesus.',
        //         'media' => 'siklet.jpg',
        //         'location' => 'Lalibela',
        //         'date' => '2024-04-12',
        //     ],
        //     [
        //         'name' => 'Maundy Thursday',
        //         'description' => 'A religious observance in the week before Fasika.',
        //         'media' => 'maundy_thursday.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-04-13',
        //     ],
        //     [
        //         'name' => 'Lidet',
        //         'description' => 'Ethiopian Orthodox holiday celebrating the Annunciation.',
        //         'media' => 'lidet.jpg',
        //         'location' => 'Bahir Dar',
        //         'date' => '2024-04-17',
        //     ],
        //     [
        //         'name' => 'Awramba Festival',
        //         'description' => 'Awramba Festival is celebrated by the Awramba community.',
        //         'media' => 'awramba_festival.jpg',
        //         'location' => 'Amhara Region',
        //         'date' => '2024-04-25',
        //     ],

        //      // May
        //     [
        //         'name' => 'Patriots’ Victory Day',
        //         'description' => 'Celebration of the victory of Ethiopian patriots over Italian forces during the Second Italo-Ethiopian War.',
        //         'media' => 'patriots_victory_day.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-05-05',
        //     ],
        //     [
        //         'name' => 'Ginbot 20',
        //         'description' => 'Marks the downfall of the Derg regime and the start of a new era in Ethiopia.',
        //         'media' => 'ginbot_20.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-05-28',
        //     ],
        //     [
        //         'name' => 'Eid al-Fitr',
        //         'description' => 'Islamic festival celebrating the end of Ramadan, observed by Muslims in Ethiopia.',
        //         'media' => 'eid_al_fitr.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-05-02',
        //     ],
        //     [
        //         'name' => 'Debre Damo Feast',
        //         'description' => 'Celebration held at the Debre Damo Monastery, honoring Abba Aregawi.',
        //         'media' => 'debre_damo.jpg',
        //         'location' => 'Tigray',
        //         'date' => '2024-05-18',
        //     ],

        //     // June
        //     [
        //         'name' => 'Holy Trinity Day (Sost Lidat)',
        //         'description' => 'Celebration of the Holy Trinity in Ethiopian Orthodox Christianity.',
        //         'media' => 'holy_trinity.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-06-12',
        //     ],
        //     [
        //         'name' => 'Eid al-Adha',
        //         'description' => 'Islamic holiday commemorating the willingness of Ibrahim to sacrifice his son in obedience to God’s command.',
        //         'media' => 'eid_al_adha.jpg',
        //         'location' => 'Harar',
        //         'date' => '2024-06-28',
        //     ],
        //     [
        //         'name' => 'Debre Zeyit Pilgrimage',
        //         'description' => 'Pilgrimage to honor Saint Abbo in Debre Zeyit.',
        //         'media' => 'debre_zeyit.jpg',
        //         'location' => 'Debre Zeyit',
        //         'date' => '2024-06-21',
        //     ],
        //     [
        //         'name' => 'Tana Kirkos Festival',
        //         'description' => 'A religious festival held on Tana Kirkos Island on Lake Tana, commemorating the Ark of the Covenant.',
        //         'media' => 'tana_kirkos.jpg',
        //         'location' => 'Lake Tana',
        //         'date' => '2024-06-23',
        //     ],

        //     // July
        //     [
        //         'name' => 'Kiddus Yohannes',
        //         'description' => 'Celebration of Saint John the Baptist in the Ethiopian Orthodox Church.',
        //         'media' => 'kiddus_yohannes.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-07-07',
        //     ],
        //     [
        //         'name' => 'Axum Tsion Mariam',
        //         'description' => 'A major festival celebrating the Virgin Mary in the town of Axum.',
        //         'media' => 'axum_tsion_mariam.jpg',
        //         'location' => 'Axum',
        //         'date' => '2024-07-23',
        //     ],
        //     [
        //         'name' => 'Saint Tekle Haymanot Feast',
        //         'description' => 'Celebration of Saint Tekle Haymanot, one of the prominent Ethiopian saints.',
        //         'media' => 'tekle_haymanot.jpg',
        //         'location' => 'Debre Libanos',
        //         'date' => '2024-07-31',
        //     ],
        //     [
        //         'name' => 'Awde Aregawi Festival',
        //         'description' => 'A festival commemorating Saint Aregawi, celebrated in Axum and other places.',
        //         'media' => 'awde_aregawi.jpg',
        //         'location' => 'Axum',
        //         'date' => '2024-07-14',
        //     ],

        //     // August
        //     [
        //         'name' => 'Buhe',
        //         'description' => 'Buhe is a children’s holiday where they go door to door singing songs.',
        //         'media' => 'buhe.jpg',
        //         'location' => 'Amhara Region',
        //         'date' => '2024-08-19',
        //     ],
        //     [
        //         'name' => 'Feast of the Assumption',
        //         'description' => 'Commemoration of the Assumption of the Virgin Mary in the Ethiopian Orthodox Church.',
        //         'media' => 'assumption.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-08-15',
        //     ],
        //     [
        //         'name' => 'Gishen Mariam Pilgrimage',
        //         'description' => 'Annual pilgrimage to Gishen Mariam Monastery in Wollo, believed to house a piece of the True Cross.',
        //         'media' => 'gishen_mariam.jpg',
        //         'location' => 'Wollo',
        //         'date' => '2024-08-24',
        //     ],
        //     [
        //         'name' => 'Saint Mary’s Day',
        //         'description' => 'Celebration of the Virgin Mary in Ethiopian Orthodox Christianity.',
        //         'media' => 'saint_mary.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-08-22',
        //     ],

        //     // September
        //     [
        //         'name' => 'Enkutatash',
        //         'description' => 'Enkutatash is the Ethiopian New Year.',
        //         'media' => 'enkutatash.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-09-11',
        //     ],
        //     [
        //         'name' => 'Meskel',
        //         'description' => 'Meskel is a religious holiday in the Ethiopian Orthodox and Eritrean Orthodox churches.',
        //         'media' => 'meskel.jpg',
        //         'location' => 'Addis Ababa',
        //         'date' => '2024-09-27',
        //     ],
        //     [
        //         'name' => 'Irreecha',
        //         'description' => 'Irreecha is a thanksgiving festival celebrated by the Oromo people.',
        //         'media' => 'irreecha.jpg',
        //         'location' => 'Bishoftu',
        //         'date' => '2024-09-30',
        //     ],
        //     [
        //         'name' => 'Saint Tekle Haymanot Day',
        //         'description' => 'Celebration of Saint Tekle Haymanot in the Ethiopian Orthodox Church.',
        //         'media' => 'tekle_haymanot.jpg',
        //         'location' => 'Debre Libanos',
        //         'date' => '2024-09-20',
        //     ],

            
        // ];
    
        $events = [
            [
                'name' => 'ያሆዴ',
                'description' => 'The traditional New Year celebration of the Hadiya people, featuring music, dance, and cultural rituals that mark the passage of time and celebrate renewal.',
                'media' => 'events/hadiya.jpg',
                'location' => 'Hadiya Zone',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ዮዮ ጊፋታ',
                'description' => 'A Wolayta New Year celebration, known for its vibrant festivities including traditional songs, dances, and a communal feast celebrating the harvest and the coming year.',
                'media' => 'events/wolayta.jpg',
                'location' => 'Wolayta Zone',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ማሽቃሮ',
                'description' => 'Kafficho people’s New Year celebration, filled with cultural performances, blessings, and rituals that reflect the community’s connection with nature and agricultural cycles.',
                'media' => 'events/kafficho.jpg',
                'location' => 'Kaffa Zone',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ዮ ማስቃላ',
                'description' => 'The Gamo people celebrate their New Year with festivities that include dance, music, and communal feasts, representing a time of gratitude for the year’s harvest.',
                'media' => 'events/gamo.jpg',
                'location' => 'Gamo Zone',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ባላ ካዳቤ',
                'description' => 'Gidicho New Year festivities, where communities gather to perform cultural songs and traditional ceremonies, welcoming the new year with optimism and blessings.',
                'media' => 'events/gidicho.jpg',
                'location' => 'Gidicho Island',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ቡዶ ኬሶ',
                'description' => 'The Zeyse people’s New Year celebration marked by traditional dances and gatherings that reflect cultural heritage and the passage of time in the community.',
                'media' => 'events/zeyse.jpg',
                'location' => 'Zeyse Woreda',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ጋሪ ዎሮ',
                'description' => 'Boro Shinaasha celebrate their New Year with rituals focused on renewal and hopes for the coming year, along with vibrant cultural dances and community events.',
                'media' => 'events/shinaasha.jpg',
                'location' => 'Shinaasha Woreda',
                'date' => '2024-09-24',
            ],
            [
                'name' => 'ጋዜ ማስቀላ',
                'description' => 'The Gofa people celebrate the New Year by reconnecting with their cultural roots, performing traditional dances, and expressing gratitude for the years blessings.',
                'media' => 'events/gofa.jpg',
                'location' => 'Gofa Zone',
                'date' => '2024-09-24',
            ],
        ];

        foreach ($events as $event) {
            Event::create($event);
        }
    }
}
