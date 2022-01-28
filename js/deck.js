const deck = `
Egg 0
Poppy seed 1
Flax seed 2
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
Cherries 15
Blueberry 16
Fig 17
Grapes 18
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
Pinto beans 43
White beans 44
Black beans 45
Kidney beans 46
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
Crackers 74
Rice 75
Pretzel 76
Bread 77
Potato 78
Sweet Potato 79
Whipped cream 80
Sprinkles 81
Cupcake 82
Ice cream 83
Popsicle 84
Chocolate chips 85
Gummy bear 86
Brownies 87
Cookies 88
Cake 89
Coconut 90
Zucchini 91
Honeydew 92
Delicata squash 93
Acorn squash 94
Cucumber 95
Canteloupe 96
Butternut Squash 97
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
Fan 110
Outlet 111
Mixer 112
Table 113
Wafflemaker 114
Toaster 115
Blender 116
Kettle 117
Microwave 118
Fridge 119
Pillow 120
Alarm clock 121
Dresser 122
Lamp 123
Chair 124
Pyjamas 125
Sleep mask 126
Blanket 127
Slippers 128
Bed 129
Coaster 130
Candle 131
Cocktail cart 132
Tray 133
Picture frame 134
Vase 135
Fireplace 136
Coat rack 137
Chandelier 138
Couch 139
Globe 140
Bookmark 141
Book 142
Bookend 143
Map 144
Bust 145
Newspaper 146
Ladder 147
Glasses 148
Magnifying glass 149
Sink 150
Soap 151
Rubber ducky 152
Comb 153
Toothbrush 154
Loofa 155
Toothpaste 156
Towel 157
Toilet 158
Toilet paper 159
Computer Mouse 160



Printer 164



Computer keyboard 168
Computer display 169

Joystick 171




Trophy 176



Innertube 180
Umbrella 181








Washer/Dryer 190






Basket 197

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