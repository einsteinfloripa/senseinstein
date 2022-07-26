import axios from "axios";
import { useEffect, useState } from "preact/hooks";

export function App() {
  const url = "http://localhost:5050";
  const [stateDadosVoluntario, setDadosVoluntario] = useState({});
  const [stateEnderecoVoluntario, setEnderecoVoluntario] = useState({});
  const [stateEntradaVoluntario, setEntradaVoluntario] = useState({});
  const [faculdades, setFaculdades] = useState([{ Cursos: [] }]);

  const funcao = ["Organizador", "Docente"];
  const estadoCivil = ["Solteiro", "Casado", "Divorciado", "Separado", "Viúvo"];
  const departamento = [
    "Hogwarts",
    "Vale",
    "Ministerio",
    "Times",
    "Embaixada",
    "Portugues",
    "Literatura",
    "Ingles",
    "Espanhol",
    "Matematica",
    "Biologia",
    "Historia",
    "Geografia",
    "Fisica",
    "Quimica",
    "Filosofia",
    "Redacao",
  ];
  const dadosVoluntario = [
    { titulo: "Nome", placeholder: "Digite seu nome" },
    {
      titulo: "Data de Nascimento",
      placeholder: "No formato xx/xx/xxxx (dia/mes/ano)",
    },
    {
      titulo: "Telefone",
      placeholder: "No formato (xx)xxxxx-xxxx",
    },
    { titulo: "Email", placeholder: "Digite seu email" },
    { titulo: "CPF", placeholder: "No formato xxx.xxx.xxx-xx" },
    { titulo: "RG", placeholder: "Digite seu RG" },
    { titulo: "Estado Civil", placeholder: estadoCivil },
    { titulo: "Função", placeholder: funcao },
    { titulo: "Departamento", placeholder: departamento },
  ];
  const entradaVoluntario = [
    { titulo: "Mes", placeholder: "Digite o mês" },
    { titulo: "Ano", placeholder: "Digite o ano" },
  ];
  const enderecoVoluntario = [
    { titulo: "Cidade", placeholder: "Digite sua cidade" },
    { titulo: "CEP", placeholder: "No formato xxxxx-xxx" },
    { titulo: "Rua", placeholder: "Digite sua rua" },
    { titulo: "Bairro", placeholder: "Digite seu bairro" },
    { titulo: "Complemento", placeholder: "" },
  ];

  useEffect(async () => {
    try {
      const cursos = await axios.get(`${url}/curso`);
      setFaculdades(cursos.data);
    } catch (error) {
      console.log(error);
    }
  }, []);
  return (
    <div className='flex justify-center bg-black w-screen'>
      <form
        className='w-1/3'
        onSubmit={(e) => {
          try {
            e.preventDefault();
            const formatarDados = {
              ...stateDadosVoluntario,
              endereco: stateEnderecoVoluntario,
              entrada: stateEntradaVoluntario,
            };
            axios.post(`${url}/voluntario`, formatarDados);
          } catch (error) {}
        }}>
        <div className='flex flex-col bg-blue-400'>
          <h1 className='text-white text-center text-5xl'>
            Cadastro de Voluntário
          </h1>

          <h1 className='text-2xl my-5'>Dados Pessoais</h1>
          {dadosVoluntario.map((dado, index) => {
            return !Array.isArray(dado.placeholder) ? (
              <>
                <h1 className='text-xl'>{dado.titulo}</h1>
                <input
                  type={dado.titulo === "Data de Nascimento" ? "date" : "text"}
                  placeholder={dado.placeholder}
                  value={stateDadosVoluntario[dado.titulo]}
                  onChange={(e) => {
                    let formatarKey = dado.titulo.toLowerCase();
                    const obj = {
                      "estado civil": "estadoCivil",
                      função: "funcao",
                      departamento: "departamento",
                      "data de nascimento": "dataNasc",
                    };
                    if (formatarKey in obj) formatarKey = obj[formatarKey];

                    setDadosVoluntario({
                      ...stateDadosVoluntario,
                      [formatarKey]: e.target.value,
                    });
                  }}
                  required
                  className='my-7 rounded-lg h-10 text-lg'
                />
              </>
            ) : (
              <>
                <h1 className='text-xl'>{dado.titulo}</h1>
                <input
                  type='text'
                  placeholder='Escolha uma opição'
                  className='my-7 rounded-lg h-10 text-lg'
                  value={stateDadosVoluntario[dado.titulo]}
                  onChange={(e) => {
                    let formatarKey = dado.titulo.toLowerCase();
                    const obj = {
                      "estado civil": "estadoCivil",
                      função: "funcao",
                      departamento: "departamento",
                      "data de nascimento": "dataNasc",
                    };

                    if (formatarKey in obj) formatarKey = obj[formatarKey];

                    setDadosVoluntario({
                      ...stateDadosVoluntario,
                      [formatarKey]: e.target.value,
                    });
                  }}
                  list={`opicoes${index}`}
                  required
                />
                <datalist id={`opicoes${index}`}>
                  {dado.placeholder.map((opcao) => {
                    return <option value={opcao} />;
                  })}
                </datalist>
              </>
            );
          })}

          <h1 className='text-2xl mb-5'>Curso</h1>
          <input
            type='text'
            placeholder='Escolha uma opição'
            className='my-7 rounded-lg h-10 text-lg'
            onChange={(e) => {
              setDadosVoluntario({
                ...stateDadosVoluntario,
                curso: e.target.value,
              });
            }}
            list={`faculdades`}
            required
          />
          <datalist id={`faculdades`}>
            {faculdades[0]["Cursos"].map((faculdade) => {
              return <option value={faculdade.nome} id={faculdade.id} />;
            })}
          </datalist>
          <h1 className='text-2xl mb-5'>Endereço</h1>
          {enderecoVoluntario.map((dado) => {
            return (
              <>
                <h1 className='text-xl'>{dado.titulo}</h1>
                <input
                  type='text'
                  placeholder={dado.placeholder}
                  value={stateEnderecoVoluntario[dado.titulo]}
                  onChange={(e) => {
                    const formatarKey = dado.titulo.toLowerCase();
                    setEnderecoVoluntario({
                      ...stateEnderecoVoluntario,
                      [formatarKey]: e.target.value,
                    });
                  }}
                  className='my-7 rounded-lg h-10 text-lg'
                  required
                />
              </>
            );
          })}

          <h1 className='text-2xl mb-5'>Data de Entrada</h1>
          {entradaVoluntario.map((dado) => {
            return (
              <>
                <h1 className='text-xl'>{dado.titulo}</h1>
                <input
                  type='text'
                  placeholder={dado.placeholder}
                  value={stateEntradaVoluntario[dado.titulo]}
                  onChange={(e) => {
                    const formatarKey = dado.titulo.toLowerCase();
                    setEntradaVoluntario({
                      ...stateEntradaVoluntario,
                      [formatarKey]: e.target.value,
                    });
                  }}
                  className='my-7 rounded-lg h-10 text-lg'
                  required
                />
              </>
            );
          })}
        </div>

        <button className='my-7 bg-white'>Enviar</button>
      </form>
    </div>
  );
}
