import requests

def send_mail(mail, subj, body):
	url = 'https://prod-23.centralus.logic.azure.com/workflows/d7697b6b72694b37bcd28fe4f12ae001/triggers/manual/paths/invoke?api-version=2016-10-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=dtiC7QiKn8BMJIPzLF-Oo35FGEpCaB6Zpuu2PNFDAuE'
	myobj = {'email': mail, 'subject': subj, 'body':body}
	x = requests.post(url, json = myobj)

send_mail('gauravgaonkar13.13@gmail.com' , 'HI' , "Bye")