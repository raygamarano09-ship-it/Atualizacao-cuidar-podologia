from db import criar_tabelas, inserir_avaliacao, listar_avaliacoes

def main():
    print("Criando tabelas...")
    criar_tabelas()
    
    print("Inserindo avaliação...")
    inserir_avaliacao("teste@email.com", 5, "Muito bom!")
    
    print("Listando avaliações...")
    avaliacoes = listar_avaliacoes()
    for av in avaliacoes:
        print(av)

if __name__ == "__main__":
    main()