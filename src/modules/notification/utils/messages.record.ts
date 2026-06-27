import { PostType } from "@root/modules/posts/enums/post-type.enum";


export class NotificationMessages {

    private static readonly messages: Record<PostType, string> = {
        [PostType.INFO]: 'Você tem uma nova informação disponível.',
        [PostType.SERVICE]: 'Um novo serviço foi publicado.',
        [PostType.EVENT]: 'Um novo evento foi criado.',
        [PostType.OPORTUNITY]: 'Uma nova oportunidade foi publicada.',
        [PostType.OTHER]: 'Você tem uma nova notificação.',
    };

    static getByType(postType: PostType): string {
        return this.messages[postType] ?? 'Você tem uma nova notificação.';
    }
}