
altura_alvo_media = calcular_altura_alvo(dados_paciente["altura_pai"], dados_paciente["altura_mae"], dados_paciente['sexo_id'])
altura_alvo_maxima = altura_alvo_media + 5 # 5 cm acima da média
altura_alvo_minima = altura_alvo_media - 5 # 5 cm abaixo da média
# com base: https://www.sbp.com.br/fileadmin/user_upload/2016/09/CrescimentoVe8.pdf
# A altura alvo é calculada somando-se a altura do pai e da mãe e 
# acrescentando-se 13 cm para meninos e subtraindo-se 13 cm para 
# meninas. O resultado é dividido por 2. A variação normal da 
# altura alvo é de 5 cm para mais ou para menos.

plt.clf();
plt.cla();

#clear figure
try:
    plt.close();
except:
    pass

# set size of a4 paper
fig, axes = plt.subplots(2, 1, figsize=(12, 18), num=' ') # dpi=300

nomeSexo = config['sexo_'+ str(dados_paciente['sexo_id'])] 

# add bold formatting to specific parts of the text
fig.text(0.08, 0.962, f'Paciente: ', ha='left', fontsize=11, fontweight='bold', bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
fig.text(0.20, 0.962, f'{dados_paciente["nome"]}', ha='left', fontsize=11, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
fig.text(0.08, 0.950, f'Nascimento: ', ha='left', fontsize=11, fontweight='bold', bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
fig.text(0.20, 0.950, f'{dados_paciente["nascimento"]} ({nomeSexo})', ha='left', fontsize=11, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))

fig.text(0.08, 0.926, f'Altura do Pai: ', ha='left', fontsize=11, fontweight='bold', bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
fig.text(0.20, 0.926, f'{dados_paciente["altura_pai"]} cm', ha='left', fontsize=11, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
fig.text(0.08, 0.914, f'Altura da Mãe: ', ha='left', fontsize=11, fontweight='bold', bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
fig.text(0.20, 0.914, f'{dados_paciente["altura_mae"]} cm', ha='left', fontsize=11, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))


for i, url in enumerate(urls):
    df = pd.read_csv(url)
    df_selecionado = df[df['Sex'] == dados_paciente["sexo_id"]].copy()
    df_selecionado['Idade (anos)'] = df_selecionado['Agemos'] / 12  # Convertendo idade de meses para anos
    plotar_dados(axes[i], df_selecionado, i)


import io, base64
buf = io.BytesIO()
plt.tight_layout()
plt.savefig(buf, format='png')
buf.seek(0)
img_str = 'data:image/png;base64,' + base64.b64encode(buf.read()).decode('UTF-8')

#plt.tight_layout()
#plt.show()
