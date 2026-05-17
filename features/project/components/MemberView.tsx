import MemberSection from './MemberSection';
import MemberSectionHeader from './MemberSectionHeader';

export default function MemberView() {
  return (
    <div className="space-y-4">
      <MemberSectionHeader />
      <MemberSection />
    </div>
  );
}
