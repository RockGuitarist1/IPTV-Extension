import { options } from './main';

/**
 * Checks if a message contains mention and changes background to BTTV style background.
 * @param {node} node - Message node
 */
export default function CheckAuthorLength(node)
{
    var authorName = $(node).find('#author-name').text();

    /* Temp fix */
    if (authorName === null) {
        return false;
    }

    if (authorName.length > 25) {
        authorName = authorName.substr(0,25) + '...';
        node.find('#author-name').get(0).innerHTML = authorName;
    }
};
