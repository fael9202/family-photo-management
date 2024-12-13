import { MessageFactory } from 'src/shared/interfaces/notifications/notification.interface';

export class ChangePasswordEmailMessage implements MessageFactory {
  private token: string;
  private subject: string;

  constructor(token: string) {
    this.token = token;
    this.subject = 'Redefinição de senha';
  }

  createSubject(): string {
    return this.subject;
  }

  createMessage(): string {
    return `
   <!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Redefinição de senha</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }
        .container {
            width: 100%;
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            border-radius: 10px;
            overflow: hidden;
        }
        .header {
            background-color: #111;
            color: #ffffff;
            text-align: center;
            padding: 20px;
        }
        .header h1 {
            margin: 0;
        }
        .content {
            padding: 20px;
            text-align: center;
        }
        .content h2 {
            color: #333333;
        }
        .content p {
            color: #666666;
            line-height: 1.6;
        }
        .button {
            display: inline-block;
            padding: 15px 25px;
            margin-top: 20px;
            background-color: #111;
            color: #ffffff;
            text-decoration: none;
            border-radius: 5px;
            font-size: 16px;
        }
        .button a {
            color: #ffffff !important;
            text-decoration: none !important;
        }
        .button:hover {
            background-color: #333;
        }
        .footer {
            background-color: #f4f4f4;
            text-align: center;
            padding: 10px;
            color: #666666;
            font-size: 12px;
        }
        @media (max-width: 600px) {
            .content h2 {
                font-size: 22px;
            }
            .content p {
                font-size: 16px;
            }
            .button {
                padding: 12px 20px;
                font-size: 14px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>Redefinição de senha</h1>
        </div>
        <div class="content">
            <h2>Olá!</h2>
            <p>Vimos que você solicitou a redefinição de senha da sua conta. Se você não solicitou essa redefinição, por favor, ignore este e-mail.</p>
            <p>Para redefinir sua senha, clique no botão abaixo:</p>
            <a href="${process.env.FRONT_END_URL}/solicitar-nova-senha/${this.token}" class="button" style="color: #ffffff !important; text-decoration: none !important;">Redefinir Senha</a>
        </div>
        <div class="footer">
            <p>&copy; Todos os direitos reservados.</p>
        </div>
    </div>
</body>
</html>
    `;
  }
}
