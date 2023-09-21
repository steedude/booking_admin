import { screen } from '@testing-library/vue';
import SideBar from '@/components/indexItems/SideBar.vue';
import { renderComponent } from '@/__tests__/unit/render';

describe('HelloWorld component', () => {
  it('renders the correct content', () => {
    renderComponent(SideBar);
    expect(screen.getByText('會議室管理')).toBeInTheDocument();
  });
});
