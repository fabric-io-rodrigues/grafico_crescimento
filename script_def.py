import pandas as pd
import matplotlib.pyplot as plt
from matplotlib.ticker import MultipleLocator
from io import StringIO

# Dados do paciente em formato (ano, mês, peso, estatura)
dados = [];
# Convertendo os dados para o formato de DataFrame e calculando a idade decimal
df_input = pd.DataFrame(dados, columns=['idade_ano', 'idade_mes', 'peso_kg', 'estatura_cm'])
df_input['idade_ano_decimal'] = df_input['idade_ano'] + df_input['idade_mes'] / 12

# clear dados
def clear_data():
    global dados
    dados = []

# add data
def add_data(ano, mes, peso, estatura):
    global dados
    dados.append([ano, mes, peso, estatura])

# update data (dados -> df_input)
def update_data():
    global dados
    global df_input
    df_input = pd.DataFrame(dados, columns=['idade_ano', 'idade_mes', 'peso_kg', 'estatura_cm'])
    df_input['idade_ano_decimal'] = df_input['idade_ano'] + df_input['idade_mes'] / 12

dados_paciente = {
    "nome": "Paciente",
    "nascimento": "21/12/2021",
    "sexo_id": 1,
    "altura_pai": 160,
    "altura_mae": 160
}

# Configurações iniciais
config = {
    "percentis": ['P3', 'P5', 'P10', 'P25', 'P50', 'P75', 'P90', 'P95', 'P97'],
    "cores": ['#ffa500', '#800080', 'blue', '#32cd32', '#ff8c00', '#006400', '#00008b', '#ffb515', '#d63d9d'],
    "titulo_1": "Meninos",
    "titulo_2": "Meninas",
    "sexo_1": "Menino",
    "sexo_2": "Menina",
    "cor_paciente": "darkblue"
}

# "https://www.cdc.gov/growthcharts/data/zscore/statage.csv", "https://www.cdc.gov/growthcharts/data/zscore/wtage.csv"
urls = [
    StringIO(globals()['csv_data1']),
    StringIO(globals()['csv_data2'])
]
file_names = ["Estatura para Idade", "Peso para Idade"]

# Função para configurar eixos secundários
def configurar_eixo_secundario(ax, i, df):
    ax2 = ax.twinx()
    y_label = 'Estatura (cm)' if i == 0 else 'Peso (kg)'
    ax.set_ylabel(y_label, color='blue')
    ax2.set_ylabel(y_label, color='red' if i else 'green')
    ax2.tick_params(axis='y', labelcolor='red' if i else 'green')
    ax.set_ylim(min(df[config['percentis'][0]]), max(df[config['percentis'][-1]]))
    ax2.set_ylim(min(df[config['percentis'][0]]), max(df[config['percentis'][-1]]))
    ax.yaxis.set_major_locator(MultipleLocator(5))
    ax2.yaxis.set_major_locator(MultipleLocator(5))

# Função para plotar os dados de cada arquivo
def plotar_dados(ax, df, i):
    # Plotando as linhas dos percentis
    for j, (percentile, color) in enumerate(zip(config['percentis'], config['cores'])):
        linewidth = 2 if percentile == 'P50' else 1  # Deixa P50 mais espessa
        ax.plot(df['Idade (anos)'], df[percentile], label=percentile, color=color, linewidth=linewidth, zorder=5)
    
    # Adicionando as linhas de 0.5 anos no eixo x
    for idade in range(int(df['Idade (anos)'].min()), int(df['Idade (anos)'].max()) + 1):
        ax.axvline(x=idade + 0.5, color='lightgray', linestyle='-', alpha=0.6, lw=1, zorder=1)
    
    # Adicionando as linhas horizontais auxiliares em todo o gráfico
    y_min, y_max = ax.get_ylim()  # Pega o intervalo do eixo Y
    for y in range(int(y_min), int(y_max) + 1, 1):  # De y_min até y_max
        ax.axhline(y=y, color='lightgray', linestyle='-', linewidth=1, alpha=0.6, zorder=1)

    # Configuração geral do gráfico
    titulo = config['titulo_'+ str(dados_paciente['sexo_id'])] 
    ax.set_title(f'{file_names[i]} - {titulo}')
    ax.set_xlabel('Idade (anos)')
    ax.set_ylabel('Z-Score')
    
    handles, labels = ax.get_legend_handles_labels()
    ax.legend(handles[::-1], labels[::-1], loc='lower right', ncol=1)  # Inverte a ordem dos handles e labels
    #ax.legend(loc='upper left', ncol=1)
        
    ax.grid(True, which='both', axis='both', linestyle='-', color='gray', alpha=0.7)
    ax.xaxis.set_major_locator(MultipleLocator(1))
    configurar_eixo_secundario(ax, i, df)

    # Plotando a linha do paciente (com pontos sem preenchimento, apenas com a borda)
    ax.plot(df_input['idade_ano_decimal'], df_input['estatura_cm' if i == 0 else 'peso_kg'], 
            label="Paciente", color=config["cor_paciente"], marker='o', markersize=2.5, 
            linestyle='-', linewidth=2, zorder=10)

    if i == 0:
        adicionar_pontos_altura_alvo(axes[i], 18.5, altura_alvo_media, altura_alvo_maxima, altura_alvo_minima)
    
    # Limitar o eixo X para o intervalo [2, 20]
    ax.set_xlim(2, 20)

# Adicionar pontos de altura alvo no gráfico
def adicionar_pontos_altura_alvo(ax, idade_futura, altura_alvo_media, altura_alvo_maxima, altura_alvo_minima):
    ax.plot([idade_futura, idade_futura], [altura_alvo_minima, altura_alvo_maxima], color=config["cor_paciente"], linestyle='-', lw=1.5, zorder=15)
    ax.plot([idade_futura - 0.1, idade_futura + 0.1], [altura_alvo_media, altura_alvo_media], color=config["cor_paciente"], linestyle='-', lw=2, zorder=20, label='Média')
    ax.plot([idade_futura - 0.1, idade_futura + 0.1], [altura_alvo_maxima, altura_alvo_maxima], color=config["cor_paciente"], linestyle='-', lw=2, zorder=20, label='Máxima')
    ax.plot([idade_futura - 0.1, idade_futura + 0.1], [altura_alvo_minima, altura_alvo_minima], color=config["cor_paciente"], linestyle='-', lw=2, zorder=20, label='Mínima')
    # Adicionando os labels (valores) ao lado dos pontos
    ax.text(idade_futura + 0.1, altura_alvo_media, f'{altura_alvo_media:.1f} cm', 
            color=config["cor_paciente"], fontsize=10, ha='left', va='center', zorder=25, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
    ax.text(idade_futura + 0.1, altura_alvo_maxima, f'{altura_alvo_maxima:.1f} cm', 
            color=config["cor_paciente"], fontsize=10, ha='left', va='center', zorder=25, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))
    ax.text(idade_futura + 0.1, altura_alvo_minima, f'{altura_alvo_minima:.1f} cm', 
            color=config["cor_paciente"], fontsize=10, ha='left', va='center', zorder=25, bbox=dict(facecolor='white', alpha=0.7, edgecolor='none'))

    
# Função para calcular altura alvo
def calcular_altura_alvo(altura_pai, altura_mae, sexo_id):
    if sexo_id == 1:
        altura_alvo = (altura_pai + altura_mae + 13) / 2 # Para meninos
    else:
        altura_alvo = (altura_pai + altura_mae - 13) / 2 # Para meninas
    return altura_alvo


# Title of project: Growth Chart
# Title pt-br: Gráfico de Crescimento
#
# by Fabricio Rodrigues - 2024
#
# This code is a script to plot the growth chart of a patient
# It uses the CDC growth charts for weight and height
# Using the data of the patient, it plots the growth chart and the target height
