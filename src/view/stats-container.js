import AbstractView from './abstract.js';

const createStatsContainerTemplate = () => {
  return '<section class="statistic"></section>';
};

export default class StatsContainer extends AbstractView {
  getTemplate() {
    return createStatsContainerTemplate();
  }
}
