import Smart from './smart.js';
import he from 'he';

const ENTER_KEY_CODE = 13;

const createSelectReactionBlock = (reactionState, hasError) => {
  const {selectedSmile, isLoading, text} = reactionState;
  return `<div class="film-details__new-comment ${hasError ? 'shake' : ''}">
          <div class="film-details__add-emoji-label">${selectedSmile ? `<img src="images/emoji/${selectedSmile}.png" width="55" height="55" alt="emoji-smile">` : ''}</div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" ${isLoading ? 'disabled' : '' } placeholder="Select reaction below and write comment here" name="comment">${text}</textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'smile' ? 'checked' : ''} ${isLoading ? 'disabled' : '' } name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'sleeping' ? 'checked' : ''} ${isLoading ? 'disabled' : '' } name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'puke' ? 'checked' : ''} ${isLoading ? 'disabled' : '' } name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" ${selectedSmile === 'angry' ? 'checked' : ''} ${isLoading ? 'disabled' : '' } name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>`;
};

export default class SelectReactionView extends Smart {
  constructor(hasError, commentData) {
    super();
    this._hasError = hasError;
    this._data = {selectedSmile: 'smile', isLoading: false, text: ''};
    if (commentData) {
      this._data.selectedSmile = commentData.emotion;
      this._data.text = commentData.text;
    }
    this._emojiClickHandler = this._emojiClickHandler.bind(this);
    this._addCommentHandler = this._addCommentHandler.bind(this);
    this._textChangeHandler = this._textChangeHandler.bind(this);
    this._addEmojiHandlers();
    this._addTextChangeHandler();
  }

  getTemplate() {
    return createSelectReactionBlock(this._data, this._hasError);
  }

  _emojiClickHandler(evt) {
    this.updateData({
      selectedSmile: evt.target.value,
    });
  }

  restoreHandlers() {
    this._addEmojiHandlers();
    this._addTextChangeHandler();
    this.setCommentHandler(this._callback.addCommentSubmit);
  }

  _addEmojiHandlers() {
    const emojis = this.getElement().querySelectorAll('.film-details__emoji-item');
    for (let i = 0; i < emojis.length; i++) {
      emojis[i].addEventListener('click', this._emojiClickHandler);
    }
  }

  _textChangeHandler(evt) {
    this.updateData({text: evt.target.value});
  }

  _addTextChangeHandler() {
    const textControl = this.getElement().querySelector('.film-details__comment-input');
    textControl.addEventListener('change', this._textChangeHandler);
  }

  _addCommentHandler(evt) {
    if ((evt.metaKey || evt.ctrlKey) && evt.keyCode === ENTER_KEY_CODE) {
      evt.preventDefault();
      evt.stopPropagation();
      this.updateData({isLoading: true});
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
