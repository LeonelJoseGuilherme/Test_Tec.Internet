document.addEventListener('DOMContentLoaded', function() {
    const cancelarBtn = document.getElementById('cancelar');
    const salvarBtn = document.getElementById('salvar');
    
    // Função para limpar o formulário
    cancelarBtn.addEventListener('click', function() {
        const inputs = document.querySelectorAll('input, select');
        inputs.forEach(input => {
            if (input.type !== 'button') {
                input.value = '';
            }
        });
        alert('Formulário limpo!');
    });
    
    // Função para salvar os dados (simulação)
    salvarBtn.addEventListener('click', function() {
        const nome = document.getElementById('nome').value;
        const idade = document.getElementById('idade').value;
        
        if (!nome || !idade) {
            alert('Por favor, preencha pelo menos o nome e a idade!');
            return;
        }
        
        alert('Dados salvos com sucesso! ');
        
        // Mostrar os dados no console para demonstração
        console.log('Dados do cliente:', {
            nome: nome,
            idade: idade,
            telefone: document.getElementById('telefone').value,
            endereco: document.getElementById('endereco').value,
            gastos: document.getElementById('gastos').value,
            dia: document.getElementById('dia').value,
            horario: document.getElementById('horario').value
        });
    });
    
    // Máscara para telefone
    const telefoneInput = document.getElementById('telefone');
    telefoneInput.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
        value = value.replace(/(\d)(\d{4})$/, '$1-$2');
        e.target.value = value;
    });
});