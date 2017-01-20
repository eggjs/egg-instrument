'use strict';

module.exports = agent => {
  agent.messenger.on('instrument', () => {
    const ins = agent.instrument('agent', 'action');
    setTimeout(() => {
      ins.end();
    }, 1000);
  });
};
