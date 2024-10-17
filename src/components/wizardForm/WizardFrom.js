import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import './styles.css'

function WizardForm() {
    const { register, handleSubmit } = useForm();
    const [step, setStep] = useState(1);
    const [locadorCpf, setLocadorCpf] = useState('');
    const [locatarioCpf, setLocatarioCpf] = useState('');

    const formatCpf = (value) => {
        // Remove caracteres não numéricos
        const cleaned = value.replace(/\D/g, '');
        // Formata o CPF
        if (cleaned.length <= 11) {
            const match = cleaned.match(/^(\d{3})(\d{3})(\d{3})(\d{2})$/);
            if (match) {
                return `${match[1]}.${match[2]}.${match[3]}-${match[4]}`;
            }
        }
        return cleaned;
    };

    const handleCpfChange = (event, type) => {
        const inputValue = event.target.value;
        const formattedCpf = formatCpf(inputValue);

        // Verifica se o comprimento está correto
        if (formattedCpf.length <= 14) {
            if (type === 'locador') {
                setLocadorCpf(formattedCpf);
            } else if (type === 'locatario') {
                setLocatarioCpf(formattedCpf);
            }
        }
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const onSubmit = (data) => {
        // Adicionando os CPFs ao objeto de dados
        const contratoData = {
            ...data,
            locadorCpf: locadorCpf,
            locatarioCpf: locatarioCpf,
        };

        // Lógica para gerar o PDF
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.setFontSize(10);

        const contrato = `
    LOCAÇÃO RESIDENCIAL

    ${contratoData.locadorNome}, ${contratoData.locadorCpf}, ${contratoData.locadorRg}, ${contratoData.locadorEndereco}, doravante denominado LOCADOR; ${contratoData.locatarioNome}, ${contratoData.locatarioCpf},
    ${contratoData.locatarioRg}, ${contratoData.locatarioEndereco}, doravante denominado LOCATÁRIO, celebram o presente contrato de locação residencial, com as cláusulas e condições seguintes:
    1) O LOCADOR cede para locação residencial ao LOCATÁRIO, o imóvel situado no endereço: ${contratoData.imovelEndereco}.
    2) A locação destina-se ao uso exclusivo como residência e domicílio do LOCATÁRIO.
    3) O prazo de locação é de ${contratoData.tempoLocacao} meses, iniciando-se em ${formatDate(contratoData.dataInicio)} e terminando em ${formatDate(contratoData.dataTermino)} limite de tempo em que o imóvel objeto do presente deverá ser restituído independenteente de qualquer notificação ou interpelação sob pena de caracterizar infração contratual.
    4) O aluguel mensal será de R$ ${contratoData.aluguel}, e deverá ser pago até a data de seu vencimento dia ${contratoData.diaVencimento} do mês seguinte ao vencido, no local do endereço do LOCADOR ou outro que o mesma venha a designar.
    4.1) A impontualidade acarretará juros moratórios de 1% ao mês. Atraso superior a 30 dias implicará correção monetária e multa de 10%.
    5) O aluguel será reajustado anualmente pelo índice ${contratoData.indiceReajuste}.
    6) Em caso de prorrogação do contrato, o aluguel será ajustado a preço de mercado.
    7) Cobranças judiciais/extrajudiciais incluirão honorários advocatícios de 20%.
    8) O imóvel destina-se ao uso exclusivo do LOCATÁRIO, não podendo ser sublocado sem autorização do LOCADOR.
    9) O LOCATÁRIO será responsável por despesas de luz, água, esgoto, condomínio, impostos e outras taxas.
    10) O LOCATÁRIO compromete-se a respeitar as regras do condomínio.
    11) A entrega das chaves será processada após quitação de todas as despesas.
    12) O LOCADOR poderá vistoriar o imóvel sempre que necessário.
    13) O LOCATÁRIO deve comunicar ao LOCADOR sua intenção de devolução com 30 dias de antecedência.
    14) O LOCATÁRIO compromete-se a solicitar vistoria 30 dias antes da desocupação.
    15) Modificações no imóvel só poderão ser feitas com autorização do LOCADOR.
    16) Em caso de incêndio, falência ou desapropriação, o contrato será rescindido sem direito a indenização.
    17) O LOCATÁRIO autoriza citação por meios eletrônicos.
    18) A parte infratora pagará multa de uma vez o valor do aluguel vigente.
    19) Devolução antecipada do imóvel implicará em multa de 2 vezes o valor do aluguel, reduzido proporcionalmente ao período já cumprido.
    20) Qualquer tolerância do LOCADOR não implicará em renúncia de direitos.
    21) Permanecendo o LOCATÁRIO no imóvel após o prazo, pagará aluguel estabelecido na notificação premonitória.
    22) Caso o imóvel seja vendido, o LOCATÁRIO renuncia ao direito de preferência e autoriza visitas.
    23) O LOCATÁRIO se compromete a devolver o imóvel nas mesmas condições em que o recebeu.
    24) O FIADOR se compromete solidariamente com o LOCATÁRIO, até a entrega das chaves, em caso de prorrogação.
    25) Em caso de insolvência do fiador, o LOCATÁRIO deverá substituí-lo dentro de 30 dias.
    26) Fica eleito o foro do domicílio do LOCADOR para dirimir quaisquer questões oriundas deste contrato.

    Local e Data: ${data.localContrato}, ${formatDate(new Date().toLocaleDateString())}

    Assinaturas:
    LOCADOR: ${contratoData.locadorNome}
    LOCATÁRIO: ${contratoData.locatarioNome}
    FIADOR: ${contratoData.fiadorNome || "Nome do Fiador"}

    Testemunhas:
    ${contratoData.testemunha1Nome || "Nome da Testemunha 1"}, ${contratoData.testemunha1Rg || "RG da Testemunha 1"}
    ${contratoData.testemunha2Nome || "Nome da Testemunha 2"}, ${contratoData.testemunha2Rg || "RG da Testemunha 2"}
    `;

        const textLines = doc.splitTextToSize(contrato, 180);
        let lineHeight = 10;
        let marginTop = 10;
        let pageHeight = doc.internal.pageSize.height;

        let cursorY = marginTop;
        textLines.forEach((line) => {
            if (cursorY + lineHeight > pageHeight - 10) {
                doc.addPage();
                cursorY = marginTop;
            }
            doc.text(line, 10, cursorY);
            cursorY += lineHeight;
        });

        doc.save('contrato-locacao.pdf');
    };

    const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Gerar Contrato de Locação Imóvel Residencial</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 && (
                        <>
                            <h2 className="text-xl font-semibold">Informações do Locador</h2>
                            <input {...register("locadorNome")} placeholder="Nome do Locador" required className="input" />
                            <input
                                value={locadorCpf}
                                onInput={(e) => handleCpfChange(e, 'locador')}
                                placeholder="CPF do Locador"
                                required
                                maxLength={14}
                                className="input"
                            />
                            <input {...register("locadorRg")} placeholder="RG do Locador" required className="input" />
                            <input {...register("locadorEndereco")} placeholder="Endereço do Locador" required className="input" />
                        </>
                    )}

                    {step === 2 && (
                        <>
                            <h2 className="text-xl font-semibold">Informações do Locatário</h2>
                            <input {...register("locatarioNome")} placeholder="Nome do Locatário" required className="input" />
                            <input
                                value={locatarioCpf}
                                onInput={(e) => handleCpfChange(e, 'locatario')}
                                placeholder="CPF do Locatário"
                                required
                                maxLength={14}
                                className="input"
                            />
                            <input {...register("locatarioRg")} placeholder="RG do Locatário" required className="input" />
                            <input {...register("locatarioEndereco")} placeholder="Endereço do Locatário" required className="input" />
                        </>
                    )}

                    {step === 3 && (
                        <>
                            <h2 className="text-xl font-semibold">Informações do Imóvel</h2>
                            <input {...register("imovelEndereco")} placeholder="Endereço do Imóvel" required className="input" />
                            <input {...register("tempoLocacao")} placeholder="Tempo de Locação (meses)" required className="input" />
                            <input {...register("aluguel")} placeholder="Valor do Aluguel (R$)" required className="input" />
                            <input {...register("dataInicio")} type="date" placeholder="Data de Início" required className="input" />
                            <input {...register("dataTermino")} type="date" placeholder="Data de Término" required className="input" />
                            <input {...register("diaVencimento")} placeholder="Dia do vencimento" required className="input" />
                            <input {...register("indiceReajuste")} placeholder="Índice de Reajuste (ex: IGP-M)" required className="input" />
                        </>
                    )}

                    {step === 4 && (
                        <>
                            <h2 className="text-xl font-semibold">Outras Informações</h2>
                            <input {...register("localContrato")} placeholder="Local do Contrato" required className="input" />
                            <input {...register("fiadorNome")} placeholder="Nome do Fiador (opcional)" className="input" />
                            <h2 className="text-xl font-semibold">Testemunhas</h2>
                            <input {...register("testemunha1Nome")} placeholder="Nome da Testemunha 1 (opcional)" className="input" />
                            <input {...register("testemunha1Rg")} placeholder="RG da Testemunha 1 (opcional)" className="input" />
                            <input {...register("testemunha2Nome")} placeholder="Nome da Testemunha 2 (opcional)" className="input" />
                            <input {...register("testemunha2Rg")} placeholder="RG da Testemunha 2 (opcional)" className="input" />
                        </>
                    )}

                    <div className="flex justify-between">
                        {step > 1 && (
                            <button
                                type="button"
                                onClick={prevStep}
                                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-300"
                            >
                                Voltar
                            </button>
                        )}
                        {step < 4 ? (
                            <button
                                type="button"
                                onClick={nextStep}
                                className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
                            >
                                Próximo
                            </button>
                        ) : (
                            <button
                                type="submit"
                                className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                            >
                                Gerar PDF
                            </button>
                        )}
                    </div>
                </form>
            </div>
        </div>
    );
}

export default WizardForm;
