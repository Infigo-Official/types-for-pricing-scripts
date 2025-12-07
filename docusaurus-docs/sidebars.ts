import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

const sidebars: SidebarsConfig = {
  docsSidebar: [
    'intro',
    {
      type: 'category',
      label: 'Global Objects',
      collapsed: true,
      items: [
        'global-objects/item',
        'global-objects/session',
        'global-objects/checkout',
        'global-objects/configuration',
        'global-objects/helper-methods',
      ],
    },
    {
      type: 'category',
      label: 'Output Functions',
      items: [
        'output/debug',
        'output/alert',
        'output/warning',
        'output/error',
        'output/console',
      ],
    },
    {
      type: 'category',
      label: 'Examples',
      items: [
        'patterns/basic-pricing',
        'patterns/tier-pricing',
        'patterns/customer-roles',
        'patterns/csv-lookup',
        'patterns/file-pricing',
        'patterns/cart-aggregation',
        'patterns/area-pricing',
        'patterns/department-discounts',
      ],
    },
  ],
};

export default sidebars;
