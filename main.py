from flask import Flask, request ,jsonify
from flask_cors import CORS
import requests
from bs4 import BeautifulSoup as bs
import fitz


def coursera(tag_c):
    response = requests.get(r"https://www.coursera.org/search?query=" + tag_c)
    b = bs(response.content, features="html.parser")
    dic = []
    for x in b.find_all('div', class_="cds-ProductCard-gridCard"):
        content = x.find('div', class_="cds-ProductCard-content")
        img = x.find('img')['src']
        link = content.find('a', class_="cds-119 cds-113 cds-115 cds-CommonCard-titleLink css-si869u cds-142")['href']

        name = content.find('h3', class_="cds-119 cds-CommonCard-title css-e7lgfl cds-121").text
        l = list(map(lambda x: x.text,content.find_all('p', class_="cds-119 cds-Typography-base css-dmxkm1 cds-121"))) + [None, None,None]

        rating = content.find('p', class_="cds-119 css-11uuo4b cds-121")
        if rating != None:
            rating = rating.text
        skills = None if l[0].find('Skills') == -1 else l[0]
        rev, special = l[1], l[2]
        dic.append({'name':name, 'skills':skills, 'rev':rev, 'special':special, 'rating':rating , 'img':img,'link':r'https://www.coursera.org'+link})
    return dic


def model(text):
    API_URL = "https://api-inference.huggingface.co/models/facebook/bart-large-mnli"
    headers = {"Authorization": "Bearer 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"}

    def query(payload):
        response = requests.post(API_URL, headers=headers, json=payload)
        return response.json()
    output = query({
        "inputs": text,
        "parameters": {"candidate_labels": ["Frontend Developer", "Backend Developer", "Fullstack Developer", "App Developer", "Game Developer", "Embedded Systems Developer", "UI Designer", "Graphic Designer"]},
    })
    print(output)
    try:
        output.pop('sequence')
    except:pass
    return output

def pdf(path):
    pdf_path = f"resumes/{path}"
    text = ''
    doc = fitz.open(pdf_path)  # open the PDF file
    for page_num in range(doc.page_count):
        page = doc[page_num]
        text += page.get_text()
    pdf_text = text  # assign the text variable to pdf_text

    return text  # return the text variable



app = Flask(__name__)
CORS(app)

@app.route('/upload',methods=['POST'])
def upload():
    file = request.files['file']
    file.save(f'resumes/{file.filename}')
    filename = file.filename
    print(filename)
    j = pdf(str(filename))
    j = model(j)
    return jsonify(j)

# define a route for the /info endpoint
@app.route('/info', methods=['GET'])
def info():
    print(request)
    tag_c = request.args.get('tag')
    data = coursera(tag_c)
    return jsonify(data)

# run the app
if __name__ == '__main__':
    app.run(debug=True)

