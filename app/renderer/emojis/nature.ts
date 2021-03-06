const nature = [
  { emoji: '🐶', alias: ':dog:', name: 'DOG FACE' },
  { emoji: '🐱', alias: ':cat:', name: 'CAT FACE' },
  { emoji: '🐭', alias: ':mouse:', name: 'MOUSE FACE' },
  { emoji: '🐹', alias: ':hamster:', name: 'HAMSTER FACE' },
  { emoji: '🐰', alias: ':rabbit:', name: 'RABBIT FACE' },
  { emoji: '🦊', alias: ':fox_face:', name: 'FOX FACE' },
  { emoji: '🐻', alias: ':bear:', name: 'BEAR FACE' },
  { emoji: '🐼', alias: ':panda_face:', name: 'PANDA FACE' },
  { emoji: '🐨', alias: ':koala:', name: 'KOALA' },
  { emoji: '🐯', alias: ':tiger:', name: 'TIGER FACE' },
  { emoji: '🦁', alias: ':lion:', name: 'LION FACE' },
  { emoji: '🐮', alias: ':cow:', name: 'COW FACE' },
  { emoji: '🐷', alias: ':pig:', name: 'PIG FACE' },
  { emoji: '🐽', alias: ':pig_nose:', name: 'PIG NOSE' },
  { emoji: '🐸', alias: ':frog:', name: 'FROG FACE' },
  { emoji: '🐵', alias: ':monkey_face:', name: 'MONKEY FACE' },
  { emoji: '🙈', alias: ':see_no_evil:', name: 'SEE-NO-EVIL MONKEY' },
  { emoji: '🙉', alias: ':hear_no_evil:', name: 'HEAR-NO-EVIL MONKEY' },
  { emoji: '🙊', alias: ':speak_no_evil:', name: 'SPEAK-NO-EVIL MONKEY' },
  { emoji: '🐒', alias: ':monkey:', name: 'MONKEY' },
  { emoji: '🐔', alias: ':chicken:', name: 'CHICKEN' },
  { emoji: '🐧', alias: ':penguin:', name: 'PENGUIN' },
  { emoji: '🐦', alias: ':bird:', name: 'BIRD' },
  { emoji: '🐤', alias: ':baby_chick:', name: 'BABY CHICK' },
  { emoji: '🐣', alias: ':hatching_chick:', name: 'HATCHING CHICK' },
  { emoji: '🐥', alias: ':hatched_chick:', name: 'FRONT-FACING BABY CHICK' },
  { emoji: '🦆', alias: ':duck:', name: 'DUCK' },
  { emoji: '🦅', alias: ':eagle:', name: 'EAGLE' },
  { emoji: '🦉', alias: ':owl:', name: 'OWL' },
  { emoji: '🦇', alias: ':bat:', name: 'BAT' },
  { emoji: '🐺', alias: ':wolf:', name: 'WOLF FACE' },
  { emoji: '🐗', alias: ':boar:', name: 'BOAR' },
  { emoji: '🐴', alias: ':horse:', name: 'HORSE FACE' },
  { emoji: '🦄', alias: ':unicorn:', name: 'UNICORN FACE' },
  { emoji: '🐝', alias: ':bee:', name: 'HONEYBEE' },
  { emoji: '🐛', alias: ':bug:', name: 'BUG' },
  { emoji: '🦋', alias: ':butterfly:', name: 'BUTTERFLY' },
  { emoji: '🐌', alias: ':snail:', name: 'SNAIL' },
  { emoji: '🐚', alias: ':shell:', name: 'SPIRAL SHELL' },
  { emoji: '🐞', alias: ':beetle:', name: 'LADY BEETLE' },
  { emoji: '🐜', alias: ':ant:', name: 'ANT' },
  { emoji: '🕷', alias: ':spider:', name: 'SPIDER' },
  { emoji: '🕸', alias: ':spider_web:', name: 'SPIDER WEB' },
  { emoji: '🐢', alias: ':turtle:', name: 'TURTLE' },
  { emoji: '🐍', alias: ':snake:', name: 'SNAKE' },
  { emoji: '🦎', alias: ':lizard:', name: 'LIZARD' },
  { emoji: '🦂', alias: ':scorpion:', name: 'SCORPION' },
  { emoji: '🦀', alias: ':crab:', name: 'CRAB' },
  { emoji: '🦑', alias: ':squid:', name: 'SQUID' },
  { emoji: '🐙', alias: ':octopus:', name: 'OCTOPUS' },
  { emoji: '🦐', alias: ':shrimp:', name: 'SHRIMP' },
  { emoji: '🐠', alias: ':tropical_fish:', name: 'TROPICAL FISH' },
  { emoji: '🐟', alias: ':fish:', name: 'FISH' },
  { emoji: '🐡', alias: ':blowfish:', name: 'BLOWFISH' },
  { emoji: '🐬', alias: ':dolphin:', name: 'DOLPHIN' },
  { emoji: '🦈', alias: ':shark:', name: 'SHARK' },
  { emoji: '🐳', alias: ':whale:', name: 'SPOUTING WHALE' },
  { emoji: '🐋', alias: ':whale2:', name: 'WHALE' },
  { emoji: '🐊', alias: ':crocodile:', name: 'CROCODILE' },
  { emoji: '🐆', alias: ':leopard:', name: 'LEOPARD' },
  { emoji: '🐅', alias: ':tiger2:', name: 'TIGER' },
  { emoji: '🐃', alias: ':water_buffalo:', name: 'WATER BUFFALO' },
  { emoji: '🐂', alias: ':ox:', name: 'OX' },
  { emoji: '🐄', alias: ':cow2:', name: 'COW' },
  { emoji: '🦌', alias: ':deer:', name: 'DEER' },
  { emoji: '🐪', alias: ':dromedary_camel:', name: 'DROMEDARY CAMEL' },
  { emoji: '🐫', alias: ':camel:', name: 'BACTRIAN CAMEL' },
  { emoji: '🐘', alias: ':elephant:', name: 'ELEPHANT' },
  { emoji: '🦏', alias: ':rhinoceros:', name: 'RHINOCEROS' },
  { emoji: '🦍', alias: ':gorilla:', name: 'GORILLA' },
  { emoji: '🐎', alias: ':racehorse:', name: 'HORSE' },
  { emoji: '🐖', alias: ':pig2:', name: 'PIG' },
  { emoji: '🐐', alias: ':goat:', name: 'GOAT' },
  { emoji: '🐏', alias: ':ram:', name: 'RAM' },
  { emoji: '🐑', alias: ':sheep:', name: 'SHEEP' },
  { emoji: '🐕', alias: ':dog2:', name: 'DOG' },
  { emoji: '🐩', alias: ':poodle:', name: 'POODLE' },
  { emoji: '🐈', alias: ':cat2:', name: 'CAT' },
  { emoji: '🐓', alias: ':rooster:', name: 'ROOSTER' },
  { emoji: '🦃', alias: ':turkey:', name: 'TURKEY' },
  { emoji: '🕊', alias: ':dove:', name: 'DOVE OF PEACE' },
  { emoji: '🐇', alias: ':rabbit2:', name: 'RABBIT' },
  { emoji: '🐁', alias: ':mouse2:', name: 'MOUSE' },
  { emoji: '🐀', alias: ':rat:', name: 'RAT' },
  { emoji: '🐿', alias: ':chipmunk:', name: 'CHIPMUNK' },
  { emoji: '🐾', alias: ':feet:', name: 'PAW PRINTS' },
  { emoji: '🐉', alias: ':dragon:', name: 'DRAGON' },
  { emoji: '🐲', alias: ':dragon_face:', name: 'DRAGON FACE' },
  { emoji: '🌵', alias: ':cactus:', name: 'CACTUS' },
  { emoji: '🎄', alias: ':christmas_tree:', name: 'CHRISTMAS TREE' },
  { emoji: '🌲', alias: ':evergreen_tree:', name: 'EVERGREEN TREE' },
  { emoji: '🌳', alias: ':deciduous_tree:', name: 'DECIDUOUS TREE' },
  { emoji: '🌴', alias: ':palm_tree:', name: 'PALM TREE' },
  { emoji: '🌱', alias: ':seedling:', name: 'SEEDLING' },
  { emoji: '🌿', alias: ':herb:', name: 'HERB' },
  {
    emoji: '☘️',
    alias: ':shamrock:',
    name: 'SHAMROCK, VARIATION SELECTOR-16'
  },
  { emoji: '🍀', alias: ':four_leaf_clover:', name: 'FOUR LEAF CLOVER' },
  { emoji: '🎍', alias: ':bamboo:', name: 'PINE DECORATION' },
  { emoji: '🎋', alias: ':tanabata_tree:', name: 'TANABATA TREE' },
  { emoji: '🍃', alias: ':leaves:', name: 'LEAF FLUTTERING IN WIND' },
  { emoji: '🍂', alias: ':fallen_leaf:', name: 'FALLEN LEAF' },
  { emoji: '🍁', alias: ':maple_leaf:', name: 'MAPLE LEAF' },
  { emoji: '🍄', alias: ':mushroom:', name: 'MUSHROOM' },
  { emoji: '🌾', alias: ':ear_of_rice:', name: 'EAR OF RICE' },
  { emoji: '💐', alias: ':bouquet:', name: 'BOUQUET' },
  { emoji: '🌷', alias: ':tulip:', name: 'TULIP' },
  { emoji: '🌹', alias: ':rose:', name: 'ROSE' },
  { emoji: '🥀', alias: ':wilted_flower:', name: 'WILTED FLOWER' },
  { emoji: '🌻', alias: ':sunflower:', name: 'SUNFLOWER' },
  { emoji: '🌼', alias: ':blossom:', name: 'BLOSSOM' },
  { emoji: '🌸', alias: ':cherry_blossom:', name: 'CHERRY BLOSSOM' },
  { emoji: '🌺', alias: ':hibiscus:', name: 'HIBISCUS' },
  { emoji: '🌎', alias: ':earth_americas:', name: 'EARTH GLOBE AMERICAS' },
  { emoji: '🌍', alias: ':earth_africa:', name: 'EARTH GLOBE EUROPE-AFRICA' },
  { emoji: '🌏', alias: ':earth_asia:', name: 'EARTH GLOBE ASIA-AUSTRALIA' },
  { emoji: '🌕', alias: ':full_moon:', name: 'FULL MOON SYMBOL' },
  {
    emoji: '🌖',
    alias: ':waning_gibbous_moon:',
    name: 'WANING GIBBOUS MOON SYMBOL'
  },
  {
    emoji: '🌗',
    alias: ':last_quarter_moon:',
    name: 'LAST QUARTER MOON SYMBOL'
  },
  {
    emoji: '🌘',
    alias: ':waning_crescent_moon:',
    name: 'WANING CRESCENT MOON SYMBOL'
  },
  { emoji: '🌑', alias: ':new_moon:', name: 'NEW MOON SYMBOL' },
  {
    emoji: '🌒',
    alias: ':waxing_crescent_moon:',
    name: 'WAXING CRESCENT MOON SYMBOL'
  },
  {
    emoji: '🌓',
    alias: ':first_quarter_moon:',
    name: 'FIRST QUARTER MOON SYMBOL'
  },
  { emoji: '🌔', alias: ':moon:', name: 'WAXING GIBBOUS MOON SYMBOL' },
  { emoji: '🌚', alias: ':new_moon_with_face:', name: 'NEW MOON WITH FACE' },
  {
    emoji: '🌝',
    alias: ':full_moon_with_face:',
    name: 'FULL MOON WITH FACE'
  },
  { emoji: '🌞', alias: ':sun_with_face:', name: 'SUN WITH FACE' },
  {
    emoji: '🌛',
    alias: ':first_quarter_moon_with_face:',
    name: 'FIRST QUARTER MOON WITH FACE'
  },
  {
    emoji: '🌜',
    alias: ':last_quarter_moon_with_face:',
    name: 'LAST QUARTER MOON WITH FACE'
  },
  { emoji: '🌙', alias: ':crescent_moon:', name: 'CRESCENT MOON' },
  { emoji: '💫', alias: ':dizzy:', name: 'DIZZY SYMBOL' },
  {
    emoji: '⭐️',
    alias: ':star:',
    name: 'WHITE MEDIUM STAR, VARIATION SELECTOR-16'
  },
  { emoji: '🌟', alias: ':star2:', name: 'GLOWING STAR' },
  { emoji: '✨', alias: ':sparkles:', name: 'SPARKLES' },
  {
    emoji: '⚡️',
    alias: ':zap:',
    name: 'HIGH VOLTAGE SIGN, VARIATION SELECTOR-16'
  },
  { emoji: '🔥', alias: ':fire:', name: 'FIRE' },
  { emoji: '💥', alias: ':boom:', name: 'COLLISION SYMBOL' },
  { emoji: '☄️', alias: ':comet:', name: 'COMET, VARIATION SELECTOR-16' },
  {
    emoji: '☀️',
    alias: ':sunny:',
    name: 'BLACK SUN WITH RAYS, VARIATION SELECTOR-16'
  },
  {
    emoji: '🌤',
    alias: ':sun_behind_small_cloud:',
    name: 'WHITE SUN WITH SMALL CLOUD'
  },
  {
    emoji: '⛅️',
    alias: ':partly_sunny:',
    name: 'SUN BEHIND CLOUD, VARIATION SELECTOR-16'
  },
  {
    emoji: '🌥',
    alias: ':sun_behind_large_cloud:',
    name: 'WHITE SUN BEHIND CLOUD'
  },
  {
    emoji: '🌦',
    alias: ':sun_behind_rain_cloud:',
    name: 'WHITE SUN BEHIND CLOUD WITH RAIN'
  },
  { emoji: '🌈', alias: ':rainbow:', name: 'RAINBOW' },
  { emoji: '☁️', alias: ':cloud:', name: 'CLOUD, VARIATION SELECTOR-16' },
  { emoji: '🌧', alias: ':cloud_with_rain:', name: 'CLOUD WITH RAIN' },
  {
    emoji: '⛈',
    alias: ':cloud_with_lightning_and_rain:',
    name: 'THUNDER CLOUD AND RAIN'
  },
  {
    emoji: '🌩',
    alias: ':cloud_with_lightning:',
    name: 'CLOUD WITH LIGHTNING'
  },
  { emoji: '🌨', alias: ':cloud_with_snow:', name: 'CLOUD WITH SNOW' },
  {
    emoji: '☃️',
    alias: ':snowman_with_snow:',
    name: 'SNOWMAN, VARIATION SELECTOR-16'
  },
  {
    emoji: '⛄️',
    alias: ':snowman:',
    name: 'SNOWMAN WITHOUT SNOW, VARIATION SELECTOR-16'
  },
  {
    emoji: '❄️',
    alias: ':snowflake:',
    name: 'SNOWFLAKE, VARIATION SELECTOR-16'
  },
  { emoji: '🌬', alias: ':wind_face:', name: 'WIND BLOWING FACE' },
  { emoji: '💨', alias: ':dash:', name: 'DASH SYMBOL' },
  { emoji: '🌪', alias: ':tornado:', name: 'CLOUD WITH TORNADO' },
  { emoji: '🌫', alias: ':fog:', name: 'FOG' },
  { emoji: '🌊', alias: ':ocean:', name: 'WATER WAVE' },
  { emoji: '💧', alias: ':droplet:', name: 'DROPLET' },
  { emoji: '💦', alias: ':sweat_drops:', name: 'SPLASHING SWEAT SYMBOL' },
  {
    emoji: '☔️',
    alias: ':umbrella:',
    name: 'UMBRELLA WITH RAIN DROPS, VARIATION SELECTOR-16'
  }
]

export default nature
