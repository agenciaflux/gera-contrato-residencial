import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './styles.css'; // Certifique-se de importar o mesmo CSS
import jsPDF from 'jspdf';

const CommercialForm = () => {
    const { register, handleSubmit } = useForm();
    const [formData, setFormData] = useState({
        locador: '',
        locadorIdentidade: '',
        locadorCpf: '',
        locadorEndereco: '',
        locataria: '',
        locatariaCnpj: '',
        locatariaEndereco: '',
        representante: '',
        representanteCpf: '',
        duracao: '',
        valorAluguel: '',
        local: '',
        cep: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };


    const onSubmit = (data) => {
        const doc = new jsPDF('p', 'mm', 'a4');
        const marginX = 20; // Margem horizontal
        const marginY = 20; // Margem vertical
        const contentWidth = doc.internal.pageSize.width - 2 * marginX; // Largura disponível
        const lineHeight = 8; // Altura de linha
        let cursorY = marginY;

        // Valores com fallback
        const locadorNacionalidade = data.locadorNacionalidade || "Nacionalidade não informada";
        const locadorProfissao = data.locadorProfissao || "Profissão não informada";
        const locadorEstadoCivil = data.locadorEstadoCivil || "Estado civil não informado";
        const locatariaSede = data.locatariaSede || "Sede não informada";

        const representanteNacionalidade = data.representanteNacionalidade || "Nacionalidade não informada";
        const representanteEstadoCivil = data.representanteEstadoCivil || "Estado civil não informado";
        const representanteProfissao = data.representanteProfissao || "Profissão não informada";
        const representanteIdentidade = data.representanteIdentidade || "Identidade não informada";

        // Função para adicionar quebra de página, se necessário
        const checkPageBreak = (increment = lineHeight) => {
            if (cursorY + increment > doc.internal.pageSize.height - marginY) {
                doc.addPage();
                cursorY = marginY;
            }
        };

        // Função para adicionar parágrafos
        const addParagraph = (text) => {
            const splitText = doc.splitTextToSize(text, contentWidth);
            splitText.forEach((line) => {
                checkPageBreak();
                doc.text(line, marginX, cursorY);
                cursorY += lineHeight;
            });
            cursorY += lineHeight; // Espaçamento após o parágrafo
        };

        // Título do Contrato
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(16);
        doc.text('CONTRATO DE LOCAÇÃO DE IMÓVEL COMERCIAL', contentWidth / 2 + marginX, cursorY, { align: 'center' });
        cursorY += lineHeight * 2;

        // Seção: Identificação das Partes Contratantes
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(12);
        doc.text('IDENTIFICAÇÃO DAS PARTES CONTRATANTES', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph(`LOCADOR: ${data.locador}, ${locadorNacionalidade}, ${locadorProfissao}, ${locadorEstadoCivil}, Carteira de Identidade nº ${data.locadorIdentidade}, e C.P.F. nº ${data.locadorCpf}, residente e domiciliado na ${data.locadorEndereco}.`);
        addParagraph(`LOCATÁRIA: ${data.locataria}, com sede em ${locatariaSede}, na ${data.locatariaEndereco}, inscrita no C.N.P.J. sob o nº ${data.locatariaCnpj}, neste ato representada pelo sócio-gerente ${data.representante}, ${representanteNacionalidade}, ${representanteEstadoCivil}, ${representanteProfissao}, Carteira de Identidade nº ${representanteIdentidade}, C.P.F. nº ${data.representanteCpf}.`);
        addParagraph('As partes acima identificadas têm, entre si, justo e acertado o presente Contrato de Locação de Imóvel Comercial e Equipamentos, que se regerá pelas cláusulas seguintes e pelas condições descritas no presente.');

        // Seção: DO OBJETO DO CONTRATO
        doc.setFont('helvetica', 'bold');
        doc.text('DO OBJETO DO CONTRATO', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph('Cláusula 1ª. O presente contrato tem como OBJETO a locação do imóvel comercial situado à Rua (xxx), nº (xxx), Bairro (xxx), Cep (xxx), no Estado (xxx), bem como dos equipamentos e ferramentas para consertos e reparos automobilísticos.');

        // Seção: DA DESCRIÇÃO DOS BENS
        doc.setFont('helvetica', 'bold');
        doc.text('DA DESCRIÇÃO DOS BENS', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph('Cláusula 2ª. O imóvel objeto deste contrato será entregue nas condições descritas no auto de vistoria, ou seja, com instalações elétricas e hidráulicas em perfeito funcionamento, com paredes pintadas, sendo que portas, portões e acessórios se encontram também em funcionamento correto, devendo a LOCATÁRIA, mantê-lo desta forma.');
        addParagraph('Cláusula 3ª. Os equipamentos e ferramentas objetos da locação encontram-se especificados e com os respectivos valores individuais no rol de maquinários, que faz parte integrante do presente instrumento.');

        // DAS BENFEITORIAS E CONSTRUÇÕES
        doc.setFont('helvetica', 'bold');
        doc.text('DAS BENFEITORIAS E CONSTRUÇÕES', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph('Cláusula 4ª. Qualquer benfeitoria ou construção que seja destinada ao imóvel objeto deste, deverá, de imediato, ser submetida à autorização expressa do LOCADOR.');
        addParagraph('Cláusula 5ª. Vindo a ser feita benfeitoria, faculta ao LOCADOR aceitá-la ou não, restando à LOCATÁRIA, em caso do LOCADOR não aceitá-la, modificar o imóvel para que fique da maneira como lhe foi entregue.');
        addParagraph('Cláusula 6ª. As benfeitorias, consertos ou reparos farão parte integrante do imóvel, não assistindo à LOCATÁRIA o direito de retenção ou indenização sobre a mesma.');

        // DA DURAÇÃO
        doc.setFont('helvetica', 'bold');
        doc.text('DA DURAÇÃO', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph('Cláusula 7ª. O presente instrumento terá duração de (xxx) meses, contados a partir do ato de sua assinatura.');
        addParagraph('Parágrafo único. Poderão as partes efetuarem o término do contrato antes do prazo estabelecido, devendo a parte interessada efetuar a notificação à outra no prazo de (xxx) meses anteriores à restituição.');

        // VALOR DO ALUGUEL, DESPESAS E TRIBUTOS
        doc.setFont('helvetica', 'bold');
        doc.text('VALOR DO ALUGUEL, DESPESAS E TRIBUTOS', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph('Cláusula 8ª. Como aluguel mensal, a LOCATÁRIA se obrigará a pagar o valor de R$ (xxx) (Valor expresso), a ser efetuado diretamente no endereço residencial do LOCADOR, e na sua ausência, ficará autorizado a recebê-lo seu procurador (xxx) (Nome do Procurador e endereço completo), devendo fazê-lo até o quinto dia útil de cada mês subseqüente ao vencido, sob pena de multa de 10% sobre o valor da locação, devidamente corrigido pelos índices diários da poupança.');
        addParagraph('Cláusula 9ª. Fica obrigado o LOCADOR ou seu procurador, a emitir recibo da quantia paga, relacionando pormenorizadamente todos os valores oriundos de juros, ou outra despesa. Emitir-se-á tal recibo, desde que haja a apresentação pela LOCATÁRIA, dos comprovantes de todas as despesas do imóvel devidamente quitadas. Caso a LOCATÁRIA venha a efetuar o pagamento do aluguel através de cheque, restará facultado ao LOCADOR emitir os recibos de pagamento somente após compensação do mesmo.');
        addParagraph('Cláusula 10ª. O valor do aluguel será reajustado anualmente, tendo como base, os índices previstos e acumulados no período anual do (IGPM ou IGP ou IPC, etc.). Em caso de falta deste índice, o reajustamento do aluguel terá por base a média da variação dos índices inflacionários do ano corrente ao da execução do aluguel, até o primeiro dia anterior ao pagamento de todos os valores devidos. Ocorrendo alguma mudança no âmbito governamental, todos os valores agregados ao aluguel, bem como o próprio aluguel, serão revistos pelas partes.');
        addParagraph('Cláusula 11ª. A LOCATÁRIA se compromete ainda a efetuar em dia o pagamento dos encargos tributários que incidam ou venham a incidir sobre o imóvel, bem como todas aquelas ligadas direta ou indiretamente com a conservação do imóvel, tais como água, luz, telefone, condomínio, etc.');

        // DA RESTITUIÇÃO DOS BENS E EQUIPAMENTOS
        doc.setFont('helvetica', 'bold');
        doc.text('DA RESTITUIÇÃO DOS BENS E EQUIPAMENTOS', marginX, cursorY);
        cursorY += lineHeight;

        doc.setFont('helvetica', 'normal');
        addParagraph('Cláusula 12ª. Fica também acordado, que o imóvel será devolvido nas mesmas condições previstas no auto de vistoria, além de, no ato da entrega das chaves, com todos os tributos e despesas pagas, caso contrário, ficará facultado ao LOCADOR adotar as medidas judiciais cabíveis.');


        // Seção de Assinaturas
        checkPageBreak(lineHeight * 4);
        doc.line(marginX, cursorY, marginX + contentWidth, cursorY); // Linha de assinatura do Locador
        cursorY += lineHeight;
        doc.text('Assinatura do Locador', marginX, cursorY);

        doc.line(marginX, cursorY + lineHeight * 2, marginX + contentWidth, cursorY + lineHeight * 2); // Linha de assinatura do Locatário
        cursorY += lineHeight * 3;
        doc.text('Assinatura do Locatário', marginX, cursorY);

        // Salva o PDF
        doc.save('contrato-comercial.pdf');
    };



    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center content-with-header">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Contrato Comercial</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {/* Identificação das Partes Contratantes */}
                    <h2 className="text-xl font-semibold">Identificação das Partes Contratantes</h2>
                    <label className="block">
                        Locador:
                        <input {...register("locador")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Carteira de Identidade nº:
                        <input {...register("locadorIdentidade")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        C.P.F. nº:
                        <input {...register("locadorCpf")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Nacionalidade:
                        <input {...register("locadorNacionalidade")} type="text" className="input" />
                    </label>
                    <label className="block">
                        Profissão:
                        <input {...register("locadorProfissao")} type="text" className="input" />
                    </label>
                    <label className="block">
                        Estado Civil:
                        <input {...register("locadorEstadoCivil")} type="text" className="input" />
                    </label>

                    <label className="block">
                        Endereço do Locador:
                        <input {...register("locadorEndereco")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <h2 className="text-xl font-semibold">Informações do Locatário</h2>
                    <label className="block">
                        Locatária:
                        <input {...register("locataria")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        CNPJ da Locatária:
                        <input {...register("locatariaCnpj")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Carteira de Identidade nº:
                        <input {...register("locatariaIdentidade")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        C.P.F. nº:
                        <input {...register("locatariaCpf")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Nacionalidade:
                        <input {...register("representanteNacionalidade")} type="text" className="input" />
                    </label>
                    <label className="block">
                        Profissão:
                        <input {...register("representanteProfissao")} type="text" className="input" />
                    </label>
                    <label className="block">
                        Estado Civil:
                        <input {...register("representanteEstadoCivil")} type="text" className="input" />
                    </label>
                    <label className="block">
                        Endereço da Locatária:
                        <input {...register("locatariaEndereco")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <h2 className="text-xl font-semibold">Informações do Representante</h2>
                    <label className="block">
                        Representante:
                        <input {...register("representante")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        C.P.F. do Representante:
                        <input {...register("representanteCpf")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        R.G. do Representante:
                        <input {...register("representanteIdentidade")} type="text" required className="input" onChange={handleChange} />
                    </label>

                    {/* Informações do Imóvel */}
                    <h2 className="text-xl font-semibold">Informações do Imóvel</h2>
                    <label className="block">
                        Endereço do Imóvel:
                        <input {...register("imovelEndereco")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        CEP:
                        <input {...register("imovelCep")} type="text" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Descrição do Imóvel:
                        <textarea {...register("descricaoImovel")} required className="input" onChange={handleChange}></textarea>
                    </label>

                    {/* Duração do Contrato */}
                    <h2 className="text-xl font-semibold">Duração do Contrato</h2>
                    <label className="block">
                        Data de Início:
                        <input {...register("dataInicio")} type="date" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Data de Término:
                        <input {...register("dataTermino")} type="date" required className="input" onChange={handleChange} />
                    </label>

                    {/* Valor do Aluguel */}
                    <h2 className="text-xl font-semibold">Valor do Aluguel</h2>
                    <label className="block">
                        Valor Mensal (R$):
                        <input {...register("valorMensal")} type="number" step="0.01" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Data de Vencimento:
                        <input {...register("dataVencimento")} type="number" required className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Garantia do Contrato:
                        <select {...register("garantia")} required className="input" onChange={handleChange}>
                            <option value="Fiador">Fiador</option>
                            <option value="Seguro Fiança">Seguro Fiança</option>
                            <option value="Depósito Caução">Depósito Caução</option>
                        </select>
                    </label>

                    {/* Cláusulas Especiais */}
                    <h2 className="text-xl font-semibold">Cláusulas Especiais</h2>
                    <label className="block">
                        Reajuste Anual (%):
                        <input {...register("reajusteAnual")} type="number" step="0.01" className="input" onChange={handleChange} />
                    </label>
                    <label className="block">
                        Multa por Atraso (%):
                        <input {...register("multaAtraso")} type="number" step="0.01" required className="input" onChange={handleChange} />
                    </label>

                    {/* Observações Gerais */}
                    <h2 className="text-xl font-semibold">Observações Gerais</h2>
                    <label className="block">
                        Observações:
                        <textarea {...register("observacoes")} className="input" onChange={handleChange}></textarea>
                    </label>

                    {/* Botão de Submissão */}
                    <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300">
                        Gerar Contrato
                    </button>
                </form>
            </div>
        </div>
    );

};

export default CommercialForm;
