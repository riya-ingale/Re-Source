import qrcode
from PIL import ImageDraw, Image, ImageFont

url = 'http://8000/institute/profile/id/role'
qrcode_img = qrcode.make(url)
qrcode_img.resize((350,350))
canvas = Image.new('RGB' , (1000, 500) , 'white')
draw = ImageDraw.Draw(canvas)
# canvas.paste(qrcode_img , (610 , 120))
light = ImageFont.truetype('Raleway-Light.ttf', size=20)
extra_bold = ImageFont.truetype('Raleway-ExtraBold.ttf', size=45)
black = ImageFont.truetype('Raleway-Black.ttf', size=25)

(x , y) = (20 , 90)
color = 'rgb(23,37,40)'
draw.text((x,y) , 'Gaurav' , fill = color , font = extra_bold)

canvas.save('id_card.png')