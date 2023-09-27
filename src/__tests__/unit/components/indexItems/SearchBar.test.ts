import { screen } from '@testing-library/vue';
import SearchBar from '@/components/reservePage/SearchBar.vue';
import { renderComponent } from '@/__tests__/unit/render';

describe('HelloWorld component', () => {
  it('renders the correct content', () => {
    renderComponent(SearchBar);
    expect(screen.getByText('搜尋bar')).toBeInTheDocument();
  });
});
