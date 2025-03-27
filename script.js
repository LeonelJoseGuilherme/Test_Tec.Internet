import { db } from './firebase-config.js';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

document.addEventListener('DOMContentLoaded', function() {
    const form = {
        nome: document.getElementById('nome'),
        idade: document.getElementById('idade'),
        telefone: document.getElementById('telefone'),
        endereco: document.getElementById('endereco'),
        gastos: document.getElementById('gastos'),
        dia: document.getElementById('dia'),
        horario: document.getElementById('horario')
    };
    
    const cancelarBtn = document.getElementById('cancelar');
    const salvarBtn = document.getElementById('salvar');

    function limparFormulario() {
        Object.values(form).forEach(element => {
            if (element.tagName === 'INPUT') {
                element.value = '';
            } else if (element.tagName === 'SELECT') {
                element.selectedIndex = 0;
            }
        });
    }

    function mostrarMensagem(mensagem, tipo = 'sucesso') {
        const mensagemDiv = document.createElement('div');
        mensagemDiv.className = `mensagem ${tipo}`;
        mensagemDiv.textContent = mensagem;
        document.body.appendChild(mensagemDiv);
        
        setTimeout(() => {
            mensagemDiv.classList.add('fade-out');
            setTimeout(() => mensagemDiv.remove(), 500);
        }, 3000);
    }

    cancelarBtn.addEventListener('click', function() {
        limparFormulario();
        mostrarMensagem('Formulário limpo com sucesso!', 'info');
    });
    
    salvarBtn.addEventListener('click', async function() {
        if (!form.nome.value.trim() || !form.idade.value.trim()) {
            mostrarMensagem('Por favor, preencha pelo menos o nome e a idade!', 'erro');
            form.nome.focus();
            return;
        }

        try {
            salvarBtn.disabled = true;
            salvarBtn.textContent = 'Salvando...';
            
            await addDoc(collection(db, "clientes"), {
                nome: form.nome.value.trim(),
                idade: form.idade.value.trim(),
                telefone: form.telefone.value.trim(),
                endereco: form.endereco.value.trim(),
                gastos: form.gastos.value.trim(),
                dia: form.dia.value,
                horario: form.horario.value,
                dataCadastro: serverTimestamp()
            });
            
            mostrarMensagem('Cliente cadastrado com sucesso!');
            limparFormulario();
            
        } catch (error) {
            console.error("Erro ao salvar:", error);
            mostrarMensagem(`Erro: ${error.message}`, 'erro');
        } finally {
            salvarBtn.disabled = false;
            salvarBtn.textContent = 'SALVAR';
        }
    });
    
    form.telefone.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    });
});