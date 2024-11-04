import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import jsPDF from 'jspdf';
import './styles.css';

function ReciboAluguel() {
    const { register, handleSubmit } = useForm();
    const [step, setStep] = useState(1);

    const onSubmit = (data) => {
        const doc = new jsPDF('p', 'mm', 'a4');
        doc.setFontSize(10);

        const recibo = `
        RECIBO DE ALUGUEL

        Recebi do(a) Sr./Sra. ${data.nomeLocatario} 
        a quantia de R$ ${data.valorAluguel},00 ((${data.descricaoPagamento})), 
        em moeda corrente, referente ao aluguel do imóvel situado no endereço ${data.enderecoImovel}, 
        vencido no dia ${data.diaVencimento}/ ${data.mesVencimento}/ ${data.anoVencimento}, 
        dando plena, total e irrevogável quitação. 

        ________________________________________, ${data.dataRecibo}

        _____________________________________________________
        Assinatura do Locador
        `;

        const textLines = doc.splitTextToSize(recibo, 180);
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

        doc.save('recibo-aluguel.pdf');
    };

    //const nextStep = () => setStep(step + 1);
    const prevStep = () => setStep(step - 1);

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Recibo de Aluguel</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    {step === 1 && (
                        <>
                            <h2 className="text-xl font-semibold">Informações do Locatário</h2>
                            <input {...register("nomeLocatario")} placeholder="Nome do Locatário" required className="input" />
                            <input {...register("valorAluguel")} placeholder="Valor do Aluguel (R$)" required className="input" />
                            <input {...register("descricaoPagamento")} placeholder="Descrição do Pagamento" required className="input" />
                            <input {...register("enderecoImovel")} placeholder="Endereço do Imóvel" required className="input" />
                            <input {...register("diaVencimento")} placeholder="Dia do Vencimento" required className="input" />
                            <input {...register("mesVencimento")} placeholder="Mês do Vencimento" required className="input" />
                            <input {...register("anoVencimento")} placeholder="Ano do Vencimento" required className="input" />
                            <input {...register("dataRecibo")} placeholder="Data do Recibo (dd/mm/aaaa)" required className="input" />
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
                        <button
                            type="submit"
                            className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                        >
                            Gerar PDF
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default ReciboAluguel;
