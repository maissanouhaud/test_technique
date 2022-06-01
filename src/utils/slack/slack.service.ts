import { HttpService } from '../../http.service';
import { SignupCredentialsDto } from '../../auth/dto/signup-credentials.dto';
import { SlackException } from './slack.exception';

export class SlackService extends HttpService {
  private slackUrl = process.env.SLACK_URL;

  public async signUpSlackNotif(user: SignupCredentialsDto) {
    try {
      const data = {
        attachments: [
          {
            fallback: `Enregistrement de l'utilisateur ${user.firstname} sur notre site.`,
            color: '#00D000',
            fields: [
              {
                title: `Nouvel enregistrement d'utilisateur`,
                value: `Utilisateur: ${user.firstname} ${user.lastname}\nAddresse Mail : ${user.email}\nSociété :${user.society}`,
                short: false,
              },
            ],
          },
        ],
      };
      await this.post(this.slackUrl, JSON.stringify(data));
    } catch (e) {
      throw new SlackException();
    }
  }

  public async signInSlackNotif(email: string) {
    try {
      const data = {
        attachments: [
          {
            fallback: `Connexion de l'utilisateur ${email} sur notre site.`,
            color: '#00D000',
            fields: [
              {
                title: `Nouvelle connexion d'utilisateur`,
                value: `Utilisateur: ${email}`,
                short: false,
              },
            ],
          },
        ],
      };
      await this.post(this.slackUrl, JSON.stringify(data));
    } catch (e) {
      throw new SlackException();
    }
  }
}
