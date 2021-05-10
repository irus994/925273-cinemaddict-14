import Smart from './smart.js';
import he from 'he';

const createSelectReactionBlock = (emojis) => {
  const {selectedSmile} = emojis;
  return `<div class="film-details__new-comment">
          <div class="film-details__add-emoji-label">${selectedSmile ? `<img src="images/emoji/${selectedSmile}.png" width="55" height="55" alt="emoji-smile">` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'smile' ? 'checked' : ''} name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'sleeping' ? 'checked' : ''} name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'puke' ? 'checked' : ''} name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'angry' ? 'checked' : ''} name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

export default class SelectReactionView extends Smart {
  constructor() {
    super();
    this._data = {selectedSmile: 'smile'};
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
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
    this.setCommentHandler(this._callback.addCommentSubmit);
  }

  addEmojiHandlers() {
    const emojis = this.getElement().querySelectorAll('.film-details__emoji-item');
    for (let i = 0; i < emojis.length; i++) {
      emojis[i].addEventListener('click', this._emojiClickHandler);
    }
  }

  _addCommentHandler(evt) {
    if ((evt.metaKey || evt.ctrlKey) && evt.keyCode == 13) {
      evt.preventDefault();
      evt.stopPropagation();
      this._callback.addCommentSubmit({
        emotion: this._getSelectedEmotion().value,
        text: he.encode(this.getElement().querySelector('.film-details__comment-input').value),
      });
    }
  }

  _getSelectedEmotion() {
    const emotions = this.getElement().querySelectorAll('.film-details__emoji-item');
    for (let i = 0; i < emotions.length; i++) {
      if (emotions[i].checked) {
        return emotions[i];
      }
    }
  }

  setCommentHandler(callback) {
    this._callback.addCommentSubmit = callback;
    const commentTextInput = this.getElement().querySelector('.film-details__comment-input');
    commentTextInput.addEventListener('keydown', this._addCommentHandler);
  }
}