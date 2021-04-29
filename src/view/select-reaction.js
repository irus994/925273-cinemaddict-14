import Smart from './smart.js';

const createSelectReactionBlock = (emojis) => {
  const {selectedSmile} = emojis;
  return `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${selectedSmile ? `<img src="images/emoji/${selectedSmile}.png" width="55" height="55" alt="emoji-smile">` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

export default class SelectReactionView extends Smart {
  constructor() {
    super();
    this._data = {};
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this.addEmojiHandlers();
  }

  getTemplate() {
    return createSelectReactionBlock(this._data);
  }

  _emojiClickHandler(evt) {
    this.updateData({
      selectedSmile: evt.target.value,
    });
  }

  restoreHandlers() {
    this.addEmojiHandlers();
  }

  addEmojiHandlers() {
    const emojis = this.getElement().querySelectorAll('.film-details__emoji-item');
    for (let i = 0; i < emojis.length; i++) {
      emojis[i].addEventListener('click', this._emojiClickHandler);
    }
  }
}
