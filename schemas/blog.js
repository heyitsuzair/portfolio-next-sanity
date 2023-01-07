export default {
  name: 'blog',
  type: 'document',
  title: 'Blog',
  fields: [
    {
      name: 'title',
      type: 'string',
      title: 'Title',
    },
    {
      name: 'content',
      type: 'string',
      title: 'Content',
    },
    {
      name: 'launch',
      type: 'datetime',
      title: 'Launch Scheduled At',
    },
  ],
}
