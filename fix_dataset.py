import json
import re

with open("dataset.json", "r", encoding="utf-8") as f:
    data = json.load(f)

lista_musicas= []
lista_edicoes=[]

for ed in data.values():
    ed['_id'] = ed.pop('id')
    if 'vencedor' not in ed:
        ed['vencedor'] = ""
    ed['anoEdicao'] = ed.pop('anoEdição', "")
    musicas = ed.pop('musicas', [])
    lista_edicoes.append(ed)
    for musica in musicas:
        if 'letra' not in musica:
            musica['letra'] = ""
        musica['_id'] = musica.pop('id')
        musica['id_edicao'] = ed['_id']
        musica['interprete'] = musica.pop('intérprete', "")
        musica['titulo'] = musica.pop('título', "")
        musica['pais'] = musica.pop('país', "")
        lista_musicas.append(musica)

with open("musicas.json", "w", encoding="utf-8") as f:
    json.dump(lista_musicas, f, ensure_ascii=False, indent=4)

with open("edicoes.json", "w", encoding="utf-8") as f:
    json.dump(lista_edicoes, f, ensure_ascii=False, indent=4)
