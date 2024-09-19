import { MessageBroker } from '../message-broker';

describe('Message broker', () => {
  it('queues and delivers messages', () => {
    const broker = new MessageBroker();
    const callback = jest.fn();
    broker.subscribeCallback('test', callback);
    broker.queueMessage('test', { test: 'test1' });
    broker.queueMessage('test', { test: 'test2' });
    broker.deliverQueuedMessages();
    expect(callback).toHaveBeenCalledWith({ test: 'test1' });
    expect(callback).toHaveBeenCalledWith({ test: 'test2' });
  });

  it('works with multiple subscribers', () => {
    const broker = new MessageBroker();
    const callback1 = jest.fn();
    const callback2 = jest.fn();
    broker.subscribeCallback('test', callback1);
    broker.subscribeCallback('test', callback2);
    broker.queueMessage('test', { test: 'test1' });
    broker.queueMessage('test', { test: 'test2' });
    broker.deliverQueuedMessages();
    expect(callback1).toHaveBeenCalledWith({ test: 'test1' });
    expect(callback1).toHaveBeenCalledWith({ test: 'test2' });
    expect(callback2).toHaveBeenCalledWith({ test: 'test1' });
    expect(callback2).toHaveBeenCalledWith({ test: 'test2' });
  });

  it('works with multiple message types and multiple subscribers', () => {
    const broker = new MessageBroker();
    const event1Callback = jest.fn();
    const event2Callback1 = jest.fn();
    const event2Callback2 = jest.fn();
    broker.subscribeCallback('event1', event1Callback);
    broker.subscribeCallback('event2', event2Callback1);
    broker.subscribeCallback('event2', event2Callback2);
    broker.queueMessage('event2', { test: 'test2' });
    broker.queueMessage('event1', { test: 'test1' });
    broker.deliverQueuedMessages();
    expect(event2Callback1).toHaveBeenCalledWith({ test: 'test2' });
    expect(event2Callback2).toHaveBeenCalledWith({ test: 'test2' });
    expect(event1Callback).toHaveBeenCalledWith({ test: 'test1' });
  });

  it('can unsubscribe subscribers', () => {
    const broker = new MessageBroker();
    const callback1 = jest.fn();
    const callback2 = jest.fn();

    broker.subscribeCallback('test1', callback1);
    broker.subscribeCallback('test1', callback2);
    broker.subscribeCallback('test2', callback1);
    broker.subscribeCallback('test2', callback2);
    broker.queueMessage('test1', {});
    broker.queueMessage('test2', {});
    broker.deliverQueuedMessages();
    expect(callback1).toHaveBeenCalledTimes(2);
    expect(callback2).toHaveBeenCalledTimes(2);

    broker.unsubscribeCallback('test1', callback1);
    broker.queueMessage('test1', {});
    broker.queueMessage('test2', {});
    broker.deliverQueuedMessages();
    expect(callback1).toHaveBeenCalledTimes(3);
    expect(callback2).toHaveBeenCalledTimes(4);
  });

  it('can push a message immediately to subscribers', () => {
    const broker = new MessageBroker();
    const callback = jest.fn();
    broker.subscribeCallback('test', callback);
    broker.pushMessage('test', { test: 'test' });
    expect(callback).toHaveBeenCalledWith({ test: 'test' });
  });
});
