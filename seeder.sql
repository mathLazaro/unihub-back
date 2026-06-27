-- Insere um usuário de teste (A senha é "abc12345678" já encriptada via bcrypt)
INSERT INTO users (id, nome, email, documento, tipo, senha, nascimento)
VALUES (
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'Usuário de Teste Seeder',
    'seeder@teste.com',
    '12345678901',
    'ESTUDANTE',
    '$2b$10$EP0c/uD0Z1N6q6kF40eBquM.1K/0hD0tK5Fp/g5CjX4r.a4Wq0eK.',
    '2000-01-01'
) ON CONFLICT DO NOTHING;

-- Insere vários tipos de posts para o Feed
INSERT INTO posts (id, title, content, type, "author_id", "contact_info", location)
VALUES 
(
    gen_random_uuid(),
    'Dica de Estudo',
    'Sempre revise os conteúdos após a aula! É fundamental para fixação.',
    'INFO',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '',
    ''
),
(
    gen_random_uuid(),
    'Manutenção de Notebooks',
    'Faço formatação e limpeza térmica. Preço camarada para alunos!',
    'SERVICE',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '11 99999-9999',
    'Laboratório 3'
),
(
    gen_random_uuid(),
    'Palestra de Tecnologia',
    'Vai rolar uma palestra sobre IA amanhã no auditório principal. Não percam!',
    'EVENT',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '',
    'Auditório Principal'
),
(
    gen_random_uuid(),
    'Vaga de Estágio',
    'Empresa parceira está procurando estagiários de desenvolvimento web. Mandem currículo!',
    'OPORTUNITY',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    'vagas@tech.com',
    'Remoto'
),
(
    gen_random_uuid(),
    'Achados e Perdidos',
    'Alguém perdeu um estojo azul na cantina? Deixei na secretaria.',
    'OTHER',
    'f47ac10b-58cc-4372-a567-0e02b2c3d479',
    '',
    'Secretaria'
);
