const places = [
  { emoji: '🚗', alias: ':car:', name: 'AUTOMOBILE' },
  { emoji: '🚕', alias: ':taxi:', name: 'TAXI' },
  { emoji: '🚙', alias: ':blue_car:', name: 'RECREATIONAL VEHICLE' },
  { emoji: '🚌', alias: ':bus:', name: 'BUS' },
  { emoji: '🚎', alias: ':trolleybus:', name: 'TROLLEYBUS' },
  { emoji: '🏎', alias: ':racing_car:', name: 'RACING CAR' },
  { emoji: '🚓', alias: ':police_car:', name: 'POLICE CAR' },
  { emoji: '🚑', alias: ':ambulance:', name: 'AMBULANCE' },
  { emoji: '🚒', alias: ':fire_engine:', name: 'FIRE ENGINE' },
  { emoji: '🚐', alias: ':minibus:', name: 'MINIBUS' },
  { emoji: '🚚', alias: ':truck:', name: 'DELIVERY TRUCK' },
  { emoji: '🚛', alias: ':articulated_lorry:', name: 'ARTICULATED LORRY' },
  { emoji: '🚜', alias: ':tractor:', name: 'TRACTOR' },
  { emoji: '🛴', alias: ':kick_scooter:', name: 'SCOOTER' },
  { emoji: '🚲', alias: ':bike:', name: 'BICYCLE' },
  { emoji: '🛵', alias: ':motor_scooter:', name: 'MOTOR SCOOTER' },
  { emoji: '🏍', alias: ':motorcycle:', name: 'RACING MOTORCYCLE' },
  {
    emoji: '🚨',
    alias: ':rotating_light:',
    name: 'POLICE CARS REVOLVING LIGHT'
  },
  {
    emoji: '🚔',
    alias: ':oncoming_police_car:',
    name: 'ONCOMING POLICE CAR'
  },
  { emoji: '🚍', alias: ':oncoming_bus:', name: 'ONCOMING BUS' },
  {
    emoji: '🚘',
    alias: ':oncoming_automobile:',
    name: 'ONCOMING AUTOMOBILE'
  },
  { emoji: '🚖', alias: ':oncoming_taxi:', name: 'ONCOMING TAXI' },
  { emoji: '🚡', alias: ':aerial_tramway:', name: 'AERIAL TRAMWAY' },
  { emoji: '🚠', alias: ':mountain_cableway:', name: 'MOUNTAIN CABLEWAY' },
  { emoji: '🚟', alias: ':suspension_railway:', name: 'SUSPENSION RAILWAY' },
  { emoji: '🚃', alias: ':railway_car:', name: 'RAILWAY CAR' },
  { emoji: '🚋', alias: ':train:', name: 'TRAM CAR' },
  { emoji: '🚞', alias: ':mountain_railway:', name: 'MOUNTAIN RAILWAY' },
  { emoji: '🚝', alias: ':monorail:', name: 'MONORAIL' },
  { emoji: '🚄', alias: ':bullettrain_side:', name: 'HIGH-SPEED TRAIN' },
  {
    emoji: '🚅',
    alias: ':bullettrain_front:',
    name: 'HIGH-SPEED TRAIN WITH BULLET NOSE'
  },
  { emoji: '🚈', alias: ':light_rail:', name: 'LIGHT RAIL' },
  { emoji: '🚂', alias: ':steam_locomotive:', name: 'STEAM LOCOMOTIVE' },
  { emoji: '🚆', alias: ':train2:', name: 'TRAIN' },
  { emoji: '🚇', alias: ':metro:', name: 'METRO' },
  { emoji: '🚊', alias: ':tram:', name: 'TRAM' },
  { emoji: '🚉', alias: ':station:', name: 'STATION' },
  { emoji: '🚁', alias: ':helicopter:', name: 'HELICOPTER' },
  { emoji: '🛩', alias: ':small_airplane:', name: 'SMALL AIRPLANE' },
  {
    emoji: '✈️',
    alias: ':airplane:',
    name: 'AIRPLANE, VARIATION SELECTOR-16'
  },
  { emoji: '🛫', alias: ':flight_departure:', name: 'AIRPLANE DEPARTURE' },
  { emoji: '🛬', alias: ':flight_arrival:', name: 'AIRPLANE ARRIVING' },
  { emoji: '🚀', alias: ':rocket:', name: 'ROCKET' },
  { emoji: '🛰', alias: ':artificial_satellite:', name: 'SATELLITE' },
  { emoji: '💺', alias: ':seat:', name: 'SEAT' },
  { emoji: '🛶', alias: ':canoe:', name: 'CANOE' },
  { emoji: '⛵️', alias: ':boat:', name: 'SAILBOAT, VARIATION SELECTOR-16' },
  { emoji: '🛥', alias: ':motor_boat:', name: 'MOTOR BOAT' },
  { emoji: '🚤', alias: ':speedboat:', name: 'SPEEDBOAT' },
  { emoji: '🛳', alias: ':passenger_ship:', name: 'PASSENGER SHIP' },
  { emoji: '⛴', alias: ':ferry:', name: 'FERRY' },
  { emoji: '🚢', alias: ':ship:', name: 'SHIP' },
  { emoji: '⚓️', alias: ':anchor:', name: 'ANCHOR, VARIATION SELECTOR-16' },
  { emoji: '🚧', alias: ':construction:', name: 'CONSTRUCTION SIGN' },
  {
    emoji: '⛽️',
    alias: ':fuelpump:',
    name: 'FUEL PUMP, VARIATION SELECTOR-16'
  },
  { emoji: '🚏', alias: ':busstop:', name: 'BUS STOP' },
  {
    emoji: '🚦',
    alias: ':vertical_traffic_light:',
    name: 'VERTICAL TRAFFIC LIGHT'
  },
  { emoji: '🚥', alias: ':traffic_light:', name: 'HORIZONTAL TRAFFIC LIGHT' },
  { emoji: '🗺', alias: ':world_map:', name: 'WORLD MAP' },
  { emoji: '🗿', alias: ':moyai:', name: 'MOYAI' },
  { emoji: '🗽', alias: ':statue_of_liberty:', name: 'STATUE OF LIBERTY' },
  {
    emoji: '⛲️',
    alias: ':fountain:',
    name: 'FOUNTAIN, VARIATION SELECTOR-16'
  },
  { emoji: '🗼', alias: ':tokyo_tower:', name: 'TOKYO TOWER' },
  { emoji: '🏰', alias: ':european_castle:', name: 'EUROPEAN CASTLE' },
  { emoji: '🏯', alias: ':japanese_castle:', name: 'JAPANESE CASTLE' },
  { emoji: '🏟', alias: ':stadium:', name: 'STADIUM' },
  { emoji: '🎡', alias: ':ferris_wheel:', name: 'FERRIS WHEEL' },
  { emoji: '🎢', alias: ':roller_coaster:', name: 'ROLLER COASTER' },
  { emoji: '🎠', alias: ':carousel_horse:', name: 'CAROUSEL HORSE' },
  { emoji: '⛱', alias: ':parasol_on_ground:', name: 'UMBRELLA ON GROUND' },
  { emoji: '🏖', alias: ':beach_umbrella:', name: 'BEACH WITH UMBRELLA' },
  { emoji: '🏝', alias: ':desert_island:', name: 'DESERT ISLAND' },
  { emoji: '⛰', alias: ':mountain:', name: 'MOUNTAIN' },
  { emoji: '🏔', alias: ':mountain_snow:', name: 'SNOW CAPPED MOUNTAIN' },
  { emoji: '🗻', alias: ':mount_fuji:', name: 'MOUNT FUJI' },
  { emoji: '🌋', alias: ':volcano:', name: 'VOLCANO' },
  { emoji: '🏜', alias: ':desert:', name: 'DESERT' },
  { emoji: '🏕', alias: ':camping:', name: 'CAMPING' },
  { emoji: '⛺️', alias: ':tent:', name: 'TENT, VARIATION SELECTOR-16' },
  { emoji: '🛤', alias: ':railway_track:', name: 'RAILWAY TRACK' },
  { emoji: '🛣', alias: ':motorway:', name: 'MOTORWAY' },
  {
    emoji: '🏗',
    alias: ':building_construction:',
    name: 'BUILDING CONSTRUCTION'
  },
  { emoji: '🏭', alias: ':factory:', name: 'FACTORY' },
  { emoji: '🏠', alias: ':house:', name: 'HOUSE BUILDING' },
  { emoji: '🏡', alias: ':house_with_garden:', name: 'HOUSE WITH GARDEN' },
  { emoji: '🏘', alias: ':houses:', name: 'HOUSE BUILDINGS' },
  { emoji: '🏚', alias: ':derelict_house:', name: 'DERELICT HOUSE BUILDING' },
  { emoji: '🏢', alias: ':office:', name: 'OFFICE BUILDING' },
  { emoji: '🏬', alias: ':department_store:', name: 'DEPARTMENT STORE' },
  { emoji: '🏣', alias: ':post_office:', name: 'JAPANESE POST OFFICE' },
  {
    emoji: '🏤',
    alias: ':european_post_office:',
    name: 'EUROPEAN POST OFFICE'
  },
  { emoji: '🏥', alias: ':hospital:', name: 'HOSPITAL' },
  { emoji: '🏦', alias: ':bank:', name: 'BANK' },
  { emoji: '🏨', alias: ':hotel:', name: 'HOTEL' },
  { emoji: '🏪', alias: ':convenience_store:', name: 'CONVENIENCE STORE' },
  { emoji: '🏫', alias: ':school:', name: 'SCHOOL' },
  { emoji: '🏩', alias: ':love_hotel:', name: 'LOVE HOTEL' },
  { emoji: '💒', alias: ':wedding:', name: 'WEDDING' },
  { emoji: '🏛', alias: ':classical_building:', name: 'CLASSICAL BUILDING' },
  { emoji: '⛪️', alias: ':church:', name: 'CHURCH, VARIATION SELECTOR-16' },
  { emoji: '🕌', alias: ':mosque:', name: 'MOSQUE' },
  { emoji: '🕍', alias: ':synagogue:', name: 'SYNAGOGUE' },
  { emoji: '🕋', alias: ':kaaba:', name: 'KAABA' },
  { emoji: '⛩', alias: ':shinto_shrine:', name: 'SHINTO SHRINE' },
  { emoji: '🗾', alias: ':japan:', name: 'SILHOUETTE OF JAPAN' },
  { emoji: '🎑', alias: ':rice_scene:', name: 'MOON VIEWING CEREMONY' },
  { emoji: '🏞', alias: ':national_park:', name: 'NATIONAL PARK' },
  { emoji: '🌅', alias: ':sunrise:', name: 'SUNRISE' },
  {
    emoji: '🌄',
    alias: ':sunrise_over_mountains:',
    name: 'SUNRISE OVER MOUNTAINS'
  },
  { emoji: '🌠', alias: ':stars:', name: 'SHOOTING STAR' },
  { emoji: '🎇', alias: ':sparkler:', name: 'FIREWORK SPARKLER' },
  { emoji: '🎆', alias: ':fireworks:', name: 'FIREWORKS' },
  { emoji: '🌇', alias: ':city_sunrise:', name: 'SUNSET OVER BUILDINGS' },
  { emoji: '🌆', alias: ':city_sunset:', name: 'CITYSCAPE AT DUSK' },
  { emoji: '🏙', alias: ':cityscape:', name: 'CITYSCAPE' },
  { emoji: '🌃', alias: ':night_with_stars:', name: 'NIGHT WITH STARS' },
  { emoji: '🌌', alias: ':milky_way:', name: 'MILKY WAY' },
  { emoji: '🌉', alias: ':bridge_at_night:', name: 'BRIDGE AT NIGHT' },
  { emoji: '🌁', alias: ':foggy:', name: 'FOGGY' }
]

export default places
