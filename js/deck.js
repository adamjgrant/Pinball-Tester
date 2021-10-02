const deck = `
  Poppy Seed 1
  Flax Seed 2
  Cumin 3
  Quinoa 4
  Sesame seed 5
  Fennel seed 6
  Sunflower seed 7
  Pine nut 8
  Pumpkin seed 9
  Apple 10
  Banana 11
  Orange 12
  Strawberry 13
  Kiwi 14
  Cherry 15
  Blueberry 16
  Fig 17
  Grape 18
  Grapefruit 19
  Plate 20
  Knife 21
  Napkin 22
  Bowl 23
  Fork 24
  Tongs 25
  Cup 26
  Pitcher 27
  Ladel 28
  Spoon 29
  Lettuce 30
  Celery 31
  Arugula 32
  Kale 33
  Broccoli 34
  Spinach 35
  Leeks 36
  Artichoke 37
  Bok choy 38
  Collard greens 39
  Chickpea 40
  Green bean 41
  Soybean 42
  Pinto bean 43
  White bean 44
  Black bean 45
  Kidney bean 46
  Lentil 47
  Peanut 48
  Lima bean 49
  Salt 50
  Pepper 51
  Honey 52
  Barbecue sauce 53
  Sauerkraut 54
  Capers 55
  Hot sauce 56
  Ketchup 57
  Mustard 58
  Relish 59
  Water 60
  Juice 61
  Milk 62
  Coffee 63
  Tea 64
  Seltzer 65
  Kombucha 66
  Beer 67
  Wine 68
  Liquor 69
  Flour 70
  Noodle 71
  Couscous 72
  Pasta 73
  Cracker 74
  Rice 75
  Pretzel 76
  Bread 77
  Potato 78
  Sweet potato 79
  Whipped cream 80
  Sprinkles 81
  Cupcake 82
  Ice cream 83
  Popsicle 84
  Chocolate chips 85
  Gummy bear 86
  Brownie 87
  Cookie 88
  Cake 89
  Coconut 90
  Zucchini 91
  Honeydew melon 92
  Delicata squash 93
  Acorn squash 94
  Cucumber 95
  Cantelope 96
  Butternut squash 97
  Watermelon 98
  Pumpkin 99
  Wood 100
  Nail 101
  Metal 102
  Screw 103
  Tile 104
  Mirror 105
  Wallpaper 106
  Carpet 107
  Stone 108
  Glass 109
  Washer/Dryer 110
  Outlet 111
  Fan 112
  Iron 113
  Vacuum 114
  Toaster 115
  Blender 116
  Kettle 117
  Microwave 118
  Fridge 119
  Table 120
  Lamp 121
  Dresser 122
  Coat rack 123
  Chair 124
  Trash can 125
  Safe 126
  Cocktail cart 127
  Couch 128
  Bed 129
  Coaster 130
  Vase 131
  Alarm clock 132
  Tray 133
  Picture frame 134
  Sleep mask 135
  Trophy 136
  Basket 137
  Pillow 138
  Blanket 139
  Globe 140
  Bookmark 141
  Book 142
  Fireplace 143
  Map 144
  Bust 145
  Bookend 146
  Ladder 147
  Glasses 148
  Magnifying glass 149
  Sink 150
  Soap 151





  Towel 157
  Toilet 158
  Toilet paper 159
`.split("\n")
    .map(i => i.trim())
    .filter(i => i !== '')
    .map(i => {
        const parts = i.split(" ");
        let tuple = [];
        tuple[1] = parseInt(parts.pop());
        tuple[0] = parts.join(" ");
        return tuple;
    });